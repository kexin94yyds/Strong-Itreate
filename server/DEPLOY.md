# Iterate 官网支付 — 阿里云 FC 手动部署清单

本文档用于把本仓库里的 iterate 官网支付后端候选代码部署到阿里云函数计算
`wechat-pay-server`。本次只先落地本地源码和 Supabase migration，不直接部署线上。

当前目标链路是：

```text
email-verification/send
  -> email-verification/confirm
  -> create-payment(paymentMethod=wechat|alipay)
  -> payment-status(orderNo, Authorization: Bearer paymentAccessToken)
  -> claim-license
```

## 结论先行

不要只部署前端。当前线上 FC 已确认仍缺少新邮箱验证和订单找回路由：

- `POST /api/iterate/email-verification/confirm` 线上返回 `404 Cannot POST`
- `POST /api/iterate/recover-order-access` 线上返回 `404 Cannot POST`
- 无 `Authorization` 的 `GET /api/iterate/payment-status/:orderNo` 线上仍返回 `200 pending`

这说明线上函数仍是旧路由集。需要部署 FC 后端和 Supabase migration，前端才会真正完成邮箱验证支付闭环。

## 发布前门禁

生产部署前必须先处理回滚基线：

1. 在阿里云 FC 控制台确认地域为华东 2（上海）。
2. 找到函数 `wechat-pay-server`。
3. 对当前线上代码发布一个不可变版本，作为回滚基线。
4. 创建稳定别名，例如 `prod`，指向该基线版本。
5. 尽量把 HTTP 触发器 `payment-trigger` 关联到别名，而不是直接指向 `LATEST`。

如果控制台暂时不能切触发器到别名，至少先发布当前版本，记录版本号和当前 `/api/health` 响应，再继续部署。

## 本地候选文件

需要进入 FC 的代码边界：

- `server/aliyun-fc-iterate-routes.js`
  - 追加到 FC 入口 `index.js` 的 `app.listen()` 之前。
  - 依赖线上已有的 `app`、`supabaseRI`、`WECHAT_CONFIG`、`callWechatAPI`、`queryWechatOrderStatus`、`generateTimeExpire`。
- `server/aliyun-fc-alipay-adapter.cjs`
  - 复制到 FC 代码目录，与 `index.js` 同级。
  - 用官方 `alipay-sdk` 注入支付宝 precreate 和 query adapter。

本地测试文件：

- `server/aliyun-fc-iterate-routes.test.js`
- `server/aliyun-fc-alipay-adapter.test.cjs`

需要先应用的 Supabase migration，建议按下列顺序执行：

- `supabase/migrations/20260527_iterate_claim_token_idempotency.sql`
- `supabase/migrations/20260527_iterate_verified_email_recovery.sql`
- `supabase/migrations/20260527_iterate_payment_provider.sql`

这些 migration 依赖生产库里已经存在基础表：

- `public.iterate_orders`
  - 当前代码需要：`order_id`、`email`、`amount`、`plan_id`、`plan_name`、`status`、`license_id`、`license_key`、`paid_at`、`payment_method`
- `public.iterate_licenses`
  - 当前代码需要：`id`、`license_key`、`order_id`、`email`、`plan_id`、`plan_name`、`license_type`、`status`、`created_at`、`expires_at`

当前仓库没有这两张基础表的原始 `CREATE TABLE` migration。部署前必须先在 Supabase 里确认基础表存在；如果缺表，先恢复基础 schema，不要直接执行 20260527 migration。

## FC 依赖与环境变量

FC 代码包需要包含依赖：

```bash
npm install alipay-sdk --save
```

必须保留现有微信支付环境变量：

- `WECHAT_APPID`
- `WECHAT_MCHID`
- `WECHAT_PRIVATE_KEY`
- `WECHAT_SERIAL_NO`
- 其他现有微信 API v3 变量

必须确认 Supabase 使用 service role 权限：

- `SUPABASE_RI_URL`
- `SUPABASE_RI_KEY`

必须配置邮箱验证和激活码签发：

- `ITERATE_LICENSE_PRIVATE_KEY_B64`
- `ITERATE_EMAIL_VERIFICATION_SECRET`
- `RESEND_API_KEY`
- `ITERATE_EMAIL_FROM`，可选，默认 `Iterate <noreply@iterate.xin>`

启用支付宝需要配置：

- `ALIPAY_APP_ID`
- `ALIPAY_PRIVATE_KEY`
- `ALIPAY_PUBLIC_KEY`

或证书模式：

- `ALIPAY_APP_CERT_PATH`
- `ALIPAY_PUBLIC_CERT_PATH`
- `ALIPAY_ROOT_CERT_PATH`

可选：

- `ALIPAY_KEY_TYPE`，默认 `PKCS8`
- `ALIPAY_GATEWAY`
- `ALIPAY_NOTIFY_URL`

如果支付宝环境变量不完整，不要注入支付宝 adapter；否则函数启动会失败。未注入 adapter 时，`paymentMethod=alipay` 会返回 `503 支付宝支付通道尚未配置`。

## FC 入口集成

在 FC 入口 `index.js` 顶部依赖区加入：

```js
const { AlipaySdk } = require('alipay-sdk');
const { createAlipayAdapters } = require('./aliyun-fc-alipay-adapter.cjs');
```

在 `app` 路由注册前、`server/aliyun-fc-iterate-routes.js` 内容追加前，确认支付宝环境变量完整后加入：

```js
Object.assign(globalThis, createAlipayAdapters(AlipaySdk, process.env));
```

然后把 `server/aliyun-fc-iterate-routes.js` 的完整内容追加到现有 FC 入口中，位置必须在：

```js
app.listen(...)
```

之前。

不要把 `server/aliyun-fc-iterate-routes.js` 当作独立模块直接 `require`，它当前是为“追加到现有 FC 入口”准备的脚本，依赖入口里的共享变量。

## 本地部署前测试

在 `/Users/apple/我的网站/Strong-Itreate` 执行：

```bash
node --test server/aliyun-fc-iterate-routes.test.js
node --test server/aliyun-fc-alipay-adapter.test.cjs
```

当前期望：两组测试全部通过。

## 线上无副作用验收

部署后先跑不发送真实邮件、不创建真实支付单的探针：

```bash
BASE='https://wechat-y-server-vjfbztievl.cn-shanghai.fcapp.run'

curl -i "$BASE/api/health"

curl -i -X OPTIONS "$BASE/api/iterate/email-verification/send"

curl -i -X POST "$BASE/api/iterate/email-verification/confirm" \
  -H 'Content-Type: application/json' \
  -d '{"email":"probe@example.invalid","code":"000000"}'

curl -i "$BASE/api/iterate/payment-status/deployment-probe-no-token"

curl -i -X POST "$BASE/api/iterate/recover-order-access" \
  -H 'Content-Type: application/json' \
  -d '{}'
```

期望结果：

- `/api/health` 返回 `200`
- `OPTIONS /api/iterate/email-verification/send` 返回 `204`
- `POST /api/iterate/email-verification/confirm` 不再是 `404 Cannot POST`；在假验证码下应返回 JSON 错误，通常是 `400 验证码无效或已过期`
- 无 token 的 `payment-status` 返回 `403`
- 空请求 `recover-order-access` 不再是 `404 Cannot POST`；应返回 JSON 错误，通常是 `400 缺少订单号或邮箱验证信息`

如果 `confirm` 返回 `500`，优先检查 Supabase migration 是否已应用以及 `SUPABASE_RI_KEY` 是否为 service role。

不要在未授权的真实邮箱上测试 `email-verification/send`。该接口会通过 Resend 发送真实邮件。

## 真实闭环验收

只有无副作用探针全部通过后，才进行真实闭环：

1. 使用受控邮箱请求 `email-verification/send`。
2. 输入验证码确认，拿到 `emailVerificationToken`。
3. 创建微信 1 天测试订单，确认返回 `paymentAccessToken`。
4. 创建支付宝 1 天测试订单，确认返回支付宝二维码。
5. 支付后用 `Authorization: Bearer <paymentAccessToken>` 查询 `payment-status`。
6. `payment-status` 成功后必须返回 `claimToken`，不能直接返回完整 `licenseKey`。
7. 调用 `claim-license` 兑换激活码。
8. 二次调用同一个 `claimToken` 必须失败。
9. 用订单号和付款邮箱重新走 `recover-order-access`，确认可恢复领取。

## 回滚

如果部署后任一无副作用探针失败：

1. 立即把触发器或 `prod` 别名切回部署前基线版本。
2. 再检查 FC 启动日志、环境变量、Supabase migration 和 adapter 注入。
3. 不要在未建立新基线的 `LATEST` 上反复手改试错。

## 当前已知阻断

- `P-2026-1602`：本地 OTP / 支付访问 token / 订单找回链路未部署到线上。
- `P-2026-1604`：线上支付函数直连 `LATEST`，缺少版本与别名回滚点。
