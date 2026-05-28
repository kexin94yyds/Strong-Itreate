/**
 * Iterate 支付路由 — 追加到阿里云 FC wechat-pay-server（v5.2.0）
 * 
 * 双层缓存方案：内存缓存（一级） + Supabase（持久化）
 * - 内存缓存：FC 实例生命周期内有效，减少 DB 查询
 * - Supabase：持久化存储，FC 重启后仍可查到历史订单
 * 
 * 依赖：复用现有 supabaseRI 客户端 + WECHAT_CONFIG
 * 支付宝：完整 FC 入口需通过 server/aliyun-fc-alipay-adapter.cjs 使用官方 SDK 注入
 *   globalThis.createAlipayPrecreatePayment / globalThis.queryAlipayTradeStatus
 */

// ============== Iterate 产品配置 ==============

const ITERATE_PLANS = {
    iterate_day1: {
        productId: 'iterate_day1',
        productName: 'Iterate 1天体验',
        amount: 199,       // 1.99 元（单位：分）
        licenseType: 'day1',
        licenseDays: 1,
    },
    iterate_day7: {
        productId: 'iterate_day7',
        productName: 'Iterate 7天体验',
        amount: 1000,      // 10 元
        licenseType: 'day7',
        licenseDays: 7,
    },
    iterate_permanent: {
        productId: 'iterate_permanent',
        productName: 'Iterate 永久版',
        amount: 3990,      // 39.9 元
        licenseType: 'permanent',
        licenseDays: null,  // 永久
    },
};

const ITERATE_COUPONS = {
    '无限迭代': {
        code: '无限迭代',
        productId: 'iterate_permanent',
        amount: 1990,      // 优惠后 19.9 元
        label: '无限迭代五折优惠',
    },
};

const ITERATE_PAYMENT_METHODS = new Set(['wechat', 'alipay']);

function resolveIteratePaymentMethod(value) {
    const paymentMethod = typeof value === 'string' ? value.trim().toLowerCase() : 'wechat';
    if (!ITERATE_PAYMENT_METHODS.has(paymentMethod)) {
        const error = new Error('不支持的支付方式');
        error.statusCode = 400;
        throw error;
    }
    return paymentMethod;
}

function normalizeIterateCouponCode(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function decodeIterateAttachValue(value) {
    try {
        return decodeURIComponent(value || '');
    } catch (_) {
        return value || '';
    }
}

function parseIterateAttach(attach) {
    return String(attach || '')
        .split(',')
        .reduce((fields, part) => {
            const separator = part.indexOf(':');
            if (separator <= 0) return fields;
            const key = part.slice(0, separator).trim();
            const value = part.slice(separator + 1).trim();
            if (key) fields[key] = decodeIterateAttachValue(value);
            return fields;
        }, {});
}

function resolveIteratePricing(plan, couponCode) {
    const normalizedCoupon = normalizeIterateCouponCode(couponCode);
    if (!normalizedCoupon) {
        return {
            plan,
            originalAmount: plan.amount,
            payAmount: plan.amount,
            couponCode: '',
            couponLabel: '',
        };
    }

    const coupon = ITERATE_COUPONS[normalizedCoupon];
    if (!coupon || coupon.productId !== plan.productId) {
        const error = new Error('优惠码无效或不适用于当前套餐');
        error.statusCode = 400;
        throw error;
    }

    return {
        plan,
        originalAmount: plan.amount,
        payAmount: coupon.amount,
        couponCode: coupon.code,
        couponLabel: coupon.label,
    };
}

function createMissingIteratePaymentAdapterError(paymentMethod) {
    const error = new Error(`${paymentMethod === 'alipay' ? '支付宝' : '微信'}支付通道尚未配置`);
    error.statusCode = 503;
    return error;
}

async function createIterateProviderPayment(paymentMethod, orderNo, plan, pricing, email) {
    if (paymentMethod === 'wechat') {
        const requestBody = {
            appid: WECHAT_CONFIG.appid,
            mchid: WECHAT_CONFIG.mchid,
            description: `${WECHAT_CONFIG.description} - ${plan.productName}`,
            out_trade_no: orderNo,
            time_expire: generateTimeExpire(30),
            attach: `product:iterate,plan:${plan.productId},email:${encodeURIComponent(email)},coupon:${encodeURIComponent(pricing.couponCode)},payAmount:${pricing.payAmount}`,
            notify_url: `https://wechat-y-server-vjfbztievl.cn-shanghai.fcapp.run/api/iterate/payment-notify`,
            amount: { total: pricing.payAmount, currency: 'CNY' },
        };
        const result = await callWechatAPI('POST', '/v3/pay/transactions/native', JSON.stringify(requestBody));
        return { codeUrl: result.code_url || '', raw: result };
    }

    const adapter = globalThis.createAlipayPrecreatePayment;
    if (typeof adapter !== 'function') {
        throw createMissingIteratePaymentAdapterError(paymentMethod);
    }
    const result = await adapter({
        outTradeNo: orderNo,
        subject: `Iterate - ${plan.productName}`,
        totalAmount: (pricing.payAmount / 100).toFixed(2),
        notifyUrl: process.env.ALIPAY_NOTIFY_URL?.trim() || '',
        metadata: {
            product: 'iterate',
            planId: plan.productId,
            email,
            couponCode: pricing.couponCode,
        },
    });
    return { codeUrl: result.codeUrl || result.qrCode || result.qr_code || '', raw: result };
}

function toIterateAmountCents(amount) {
    const number = Number(amount);
    return Number.isFinite(number) ? Math.round(number * 100) : null;
}

async function queryIterateProviderPaymentStatus(paymentMethod, orderNo) {
    if (paymentMethod === 'wechat') {
        return queryWechatOrderStatus(orderNo);
    }

    const adapter = globalThis.queryAlipayTradeStatus;
    if (typeof adapter !== 'function') {
        throw createMissingIteratePaymentAdapterError(paymentMethod);
    }
    const result = await adapter(orderNo);
    if (result.outTradeNo && result.outTradeNo !== orderNo) {
        const error = new Error('支付宝返回的订单号不匹配');
        error.statusCode = 400;
        throw error;
    }
    const tradeStatus = String(result.tradeStatus || result.trade_status || '').toUpperCase();
    const paid = tradeStatus === 'TRADE_SUCCESS' || tradeStatus === 'TRADE_FINISHED';
    return {
        trade_state: paid ? 'SUCCESS' : tradeStatus === 'WAIT_BUYER_PAY' ? 'NOTPAY' : tradeStatus,
        amount: { total: toIterateAmountCents(result.totalAmount || result.total_amount) },
        success_time: result.sendPayDate || result.gmtPayment || result.paidAt || null,
        update_time: result.gmtPayment || result.paidAt || null,
    };
}

// 内存缓存：订单号 → { licenseKey, plan, email, createdAt }
// 一级缓存，减少 Supabase 查询次数
const iterateOrderCache = new Map();

// 清理过期缓存（保留 2 小时内的订单）
function cleanIterateOrderCache() {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    for (const [orderNo, data] of iterateOrderCache) {
        if (data.createdAt < twoHoursAgo) {
            iterateOrderCache.delete(orderNo);
        }
    }
}

// ============== Iterate License 工具函数 ==============

const ITERATE_LICENSE_PREFIX = 'ITL1';
const ITERATE_LICENSE_PRODUCT = 'iterate';
const ITERATE_CLAIM_TOKEN_TTL_MS = 5 * 60 * 1000;
const ITERATE_EMAIL_CODE_TTL_MS = 10 * 60 * 1000;
const ITERATE_EMAIL_TOKEN_TTL_MS = 15 * 60 * 1000;
const ITERATE_PAYMENT_ACCESS_TTL_MS = 24 * 60 * 60 * 1000;

function toBase64UrlNoPad(input) {
    return Buffer.from(input)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/g, '');
}

function getIterateLicensePrivateKey() {
    const privateKey = process.env.ITERATE_LICENSE_PRIVATE_KEY_B64?.trim();
    if (!privateKey) {
        throw new Error('缺少 ITERATE_LICENSE_PRIVATE_KEY_B64，无法签发激活码');
    }
    return privateKey;
}

function generateIterateLicenseKey(licenseType, options = {}) {
    const payload = {
        version: 1,
        product: ITERATE_LICENSE_PRODUCT,
        license_type: licenseType,
        issued_at: options.issuedAt || new Date().toISOString(),
        nonce: options.nonce || crypto.randomUUID(),
    };
    if (options.orderId) {
        payload.order_id = options.orderId;
    }

    const payloadJson = JSON.stringify(payload);
    const privateKey = crypto.createPrivateKey({
        key: Buffer.from(getIterateLicensePrivateKey(), 'base64'),
        format: 'der',
        type: 'pkcs8',
    });
    const signature = crypto.sign(null, Buffer.from(payloadJson), privateKey);
    return `${ITERATE_LICENSE_PREFIX}.${toBase64UrlNoPad(payloadJson)}.${toBase64UrlNoPad(signature)}`;
}

function hashIterateClaimToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function normalizeIterateEmail(value) {
    return typeof value === 'string' ? value.trim().toLowerCase().substring(0, 254) : '';
}

function getIterateEmailVerificationSecret() {
    const secret = process.env.ITERATE_EMAIL_VERIFICATION_SECRET?.trim();
    if (!secret) {
        throw new Error('缺少 ITERATE_EMAIL_VERIFICATION_SECRET，无法验证邮箱');
    }
    return secret;
}

function hashIterateEmailCredential(purpose, email, value) {
    return crypto
        .createHmac('sha256', getIterateEmailVerificationSecret())
        .update(`${purpose}:${email}:${value}`)
        .digest('hex');
}

function generateIterateEmailCode() {
    return crypto.randomInt(0, 1000000).toString().padStart(6, '0');
}

function generateIterateOpaqueToken() {
    return crypto.randomBytes(32).toString('hex');
}

function buildIterateClaimToken(orderNo, licenseKey, nonce) {
    const signature = crypto
        .createHmac('sha256', licenseKey)
        .update(`${orderNo}:${nonce}`)
        .digest('hex');
    return `ict1_${nonce}.${signature}`;
}

// ============== Iterate 数据库操作（Supabase 持久化） ==============

async function saveIterateLicenseToDatabase(licenseKey, orderNo, email, plan, pricing = null, paymentMethod = 'wechat') {
    if (!supabaseRI) {
        console.warn('⚠️ Supabase 未初始化，仅使用内存缓存');
        return { success: false, error: 'Supabase 未初始化' };
    }

    try {
        const now = new Date().toISOString();
        const expiresAt = plan.licenseDays
            ? new Date(Date.now() + plan.licenseDays * 24 * 60 * 60 * 1000).toISOString()
            : null;

        // 创建 License 记录
        const { data, error } = await supabaseRI
            .from('iterate_licenses')
            .insert([{
                license_key: licenseKey,
                order_id: orderNo,
                email: email || '',
                plan_id: plan.productId,
                plan_name: plan.productName,
                license_type: plan.licenseType,
                status: 'active',
                created_at: now,
                expires_at: expiresAt,
            }])
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                // 并发重复键，查询已有记录
                const existingKey = await getIterateLicenseFromDatabase(orderNo);
                if (existingKey) {
                    return { success: true, licenseKey: existingKey, existing: true };
                }
            }
            console.error('❌ 创建 Iterate License 失败:', error);
            return { success: false, error: error.message };
        }

        // 创建订单记录
        const paidAmount = pricing?.payAmount || plan.amount;
        const { error: orderError } = await supabaseRI
            .from('iterate_orders')
            .insert([{
                order_id: orderNo,
                email: email || '',
                payment_method: paymentMethod,
                amount: paidAmount / 100,
                plan_id: plan.productId,
                plan_name: plan.productName,
                status: 'success',
                license_id: data.id,
                license_key: licenseKey,
                paid_at: now,
            }]);

        if (orderError) {
            console.error('⚠️ 创建 Iterate 订单记录失败:', orderError);
        }

        console.log('✅ Iterate License 已持久化到 Supabase, 订单:', orderNo);
        return { success: true, licenseKey, existing: false };
    } catch (error) {
        console.error('❌ Iterate Supabase 写入异常:', error);
        return { success: false, error: error.message };
    }
}

async function getIterateLicenseFromDatabase(orderNo) {
    if (!supabaseRI) return null;
    try {
        const { data, error } = await supabaseRI
            .from('iterate_orders')
            .select('license_key')
            .eq('order_id', orderNo)
            .single();

        if (error || !data) return null;
        return data.license_key || null;
    } catch (e) {
        return null;
    }
}

async function sendIterateEmailVerificationCode(email, code) {
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
        throw new Error('缺少 RESEND_API_KEY，无法发送验证邮件');
    }

    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: process.env.ITERATE_EMAIL_FROM?.trim() || 'Iterate <noreply@iterate.xin>',
            to: email,
            subject: 'Iterate 购买邮箱验证码',
            html: `<p>你的 Iterate 邮箱验证码是：</p><p style="font-size: 24px; font-weight: 700; letter-spacing: 0.2em;">${code}</p><p>验证码 10 分钟内有效。若非本人操作，请忽略本邮件。</p>`,
        }),
    });

    if (!response.ok) {
        throw new Error(`发送验证邮件失败: ${response.status}`);
    }
}

async function createIterateEmailChallenge(email) {
    if (!supabaseRI) {
        return { success: false, statusCode: 503, error: '服务不可用' };
    }

    try {
        const rateLimitSince = new Date(Date.now() - 60 * 1000).toISOString();
        const { data: recentRows, error: recentError } = await supabaseRI
            .from('iterate_email_verifications')
            .select('id')
            .eq('email', email)
            .gt('created_at', rateLimitSince)
            .limit(1);
        if (recentError) {
            throw new Error(recentError.message);
        }
        if (recentRows && recentRows.length > 0) {
            return { success: false, statusCode: 429, error: '验证码发送过于频繁，请稍后重试' };
        }

        const code = generateIterateEmailCode();
        const { error } = await supabaseRI
            .from('iterate_email_verifications')
            .insert([{
                email,
                code_hash: hashIterateEmailCredential('code', email, code),
                code_expires_at: new Date(Date.now() + ITERATE_EMAIL_CODE_TTL_MS).toISOString(),
            }]);
        if (error) {
            throw new Error(error.message);
        }

        await sendIterateEmailVerificationCode(email, code);
        return { success: true };
    } catch (error) {
        console.error('❌ 发送 Iterate 邮箱验证码失败:', error.message);
        return { success: false, statusCode: 500, error: '验证码发送失败' };
    }
}

async function confirmIterateEmailChallenge(email, code) {
    if (!supabaseRI) {
        return { success: false, statusCode: 503, error: '服务不可用' };
    }

    try {
        const now = new Date().toISOString();
        const { data, error } = await supabaseRI
            .from('iterate_email_verifications')
            .select('id')
            .eq('email', email)
            .eq('code_hash', hashIterateEmailCredential('code', email, code))
            .is('verified_at', null)
            .is('consumed_at', null)
            .gt('code_expires_at', now)
            .order('created_at', { ascending: false })
            .limit(1);
        if (error) {
            throw new Error(error.message);
        }
        if (!data || data.length === 0) {
            return { success: false, statusCode: 400, error: '验证码无效或已过期' };
        }

        const verificationToken = generateIterateOpaqueToken();
        const { data: verifiedRows, error: verifyError } = await supabaseRI
            .from('iterate_email_verifications')
            .update({
                verified_at: now,
                verification_token_hash: hashIterateEmailCredential('verification', email, verificationToken),
                token_expires_at: new Date(Date.now() + ITERATE_EMAIL_TOKEN_TTL_MS).toISOString(),
            })
            .eq('id', data[0].id)
            .is('verified_at', null)
            .select('id');
        if (verifyError) {
            throw new Error(verifyError.message);
        }
        if (!verifiedRows || verifiedRows.length === 0) {
            return { success: false, statusCode: 409, error: '验证码已使用，请重新验证' };
        }

        return { success: true, verificationToken };
    } catch (error) {
        console.error('❌ 确认 Iterate 邮箱验证码失败:', error.message);
        return { success: false, statusCode: 500, error: '邮箱验证失败' };
    }
}

async function consumeIterateEmailVerification(email, verificationToken) {
    if (!supabaseRI || !verificationToken) return false;

    try {
        const now = new Date().toISOString();
        const { data, error } = await supabaseRI
            .from('iterate_email_verifications')
            .update({ consumed_at: now })
            .eq('email', email)
            .eq('verification_token_hash', hashIterateEmailCredential('verification', email, verificationToken))
            .not('verified_at', 'is', null)
            .is('consumed_at', null)
            .gt('token_expires_at', now)
            .select('id');
        return !error && data && data.length > 0;
    } catch (error) {
        console.error('❌ 消费 Iterate 邮箱验证会话失败:', error.message);
        return false;
    }
}

async function issueIteratePaymentAccessToken(orderNo, email, metadata = {}) {
    if (!supabaseRI) return null;

    const accessToken = generateIterateOpaqueToken();
    const accessTokenHash = hashIterateClaimToken(accessToken);
    const expiresAt = new Date(Date.now() + ITERATE_PAYMENT_ACCESS_TTL_MS).toISOString();
    const paymentMetadata = {};
    if (metadata.paymentMethod) paymentMetadata.payment_method = resolveIteratePaymentMethod(metadata.paymentMethod);
    if (metadata.planId) paymentMetadata.plan_id = metadata.planId;
    if (Number.isInteger(metadata.amountCents)) paymentMetadata.amount_cents = metadata.amountCents;
    if (metadata.couponCode !== undefined) paymentMetadata.coupon_code = normalizeIterateCouponCode(metadata.couponCode);
    const { error } = await supabaseRI
        .from('iterate_payment_access')
        .insert([{
            order_no: orderNo,
            email,
            access_token_hash: accessTokenHash,
            expires_at: expiresAt,
            ...paymentMetadata,
        }]);

    if (!error) return accessToken;
    if (error.code !== '23505') {
        console.error('❌ 创建 Iterate 支付访问 token 失败:', error.message);
        return null;
    }

    const { data, error: rotateError } = await supabaseRI
        .from('iterate_payment_access')
        .update({
            email,
            access_token_hash: accessTokenHash,
            expires_at: expiresAt,
            revoked_at: null,
            ...paymentMetadata,
        })
        .eq('order_no', orderNo)
        .select('order_no');
    if (rotateError || !data || data.length === 0) {
        console.error('❌ 换发 Iterate 支付访问 token 失败:', rotateError?.message || '未更新记录');
        return null;
    }
    return accessToken;
}

function getIterateBearerToken(req) {
    const authorization = String(req.headers?.authorization || '');
    return authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : '';
}

async function getIteratePaymentAccess(req, orderNo) {
    if (!supabaseRI) return null;
    const accessToken = getIterateBearerToken(req);
    if (!accessToken) return null;

    try {
        const { data, error } = await supabaseRI
            .from('iterate_payment_access')
            .select('email, payment_method, plan_id, amount_cents, coupon_code')
            .eq('order_no', orderNo)
            .eq('access_token_hash', hashIterateClaimToken(accessToken))
            .is('revoked_at', null)
            .gt('expires_at', new Date().toISOString())
            .limit(1);
        return !error && data && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('❌ 校验 Iterate 支付访问 token 失败:', error.message);
        return null;
    }
}

async function findIteratePaymentAccessByOrderNo(orderNo) {
    if (!supabaseRI) return null;

    try {
        const { data, error } = await supabaseRI
            .from('iterate_payment_access')
            .select('email, payment_method, plan_id, amount_cents, coupon_code')
            .eq('order_no', orderNo)
            .limit(1);
        return !error && data && data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('❌ 查询 Iterate 支付访问记录失败:', error.message);
        return null;
    }
}

function createIteratePaymentAccessMetadata(storedAccess) {
    if (!storedAccess) return {};

    const metadata = {};
    if (storedAccess.payment_method) metadata.paymentMethod = storedAccess.payment_method;
    if (storedAccess.plan_id) metadata.planId = storedAccess.plan_id;
    const amountCents = Number(storedAccess.amount_cents);
    if (Number.isInteger(amountCents) && amountCents > 0) metadata.amountCents = amountCents;
    if (storedAccess.coupon_code !== undefined) metadata.couponCode = storedAccess.coupon_code || '';
    return metadata;
}

async function findReusableIterateClaimToken(orderNo) {
    const { data, error } = await supabaseRI
        .from('iterate_claim_tokens')
        .select('license_key, token_nonce, expires_at')
        .eq('order_no', orderNo)
        .is('used_at', null)
        .is('revoked_at', null)
        .gt('expires_at', new Date().toISOString())
        .not('token_nonce', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        throw new Error(`查询可复用 claim token 失败: ${error.message}`);
    }

    return data && data.length > 0 ? data[0] : null;
}

async function createIterateClaimToken(orderNo, licenseKey, options = {}) {
    if (!supabaseRI) return null;

    try {
        const { data: consumedRows, error: consumedError } = await supabaseRI
            .from('iterate_claim_tokens')
            .select('id')
            .eq('order_no', orderNo)
            .not('used_at', 'is', null)
            .limit(1);

        if (consumedError) {
            throw new Error(`查询已领取 token 失败: ${consumedError.message}`);
        }
        if (consumedRows && consumedRows.length > 0) {
            const { error: redundantError } = await supabaseRI
                .from('iterate_claim_tokens')
                .update({ revoked_at: new Date().toISOString() })
                .eq('order_no', orderNo)
                .is('used_at', null)
                .is('revoked_at', null);
            if (redundantError) {
                throw new Error(`撤销领取后残留 token 失败: ${redundantError.message}`);
            }
            if (!options.allowPreviouslyClaimed) {
                return { claimed: true, token: null };
            }
        }

        const now = new Date().toISOString();
        const { error: expiredError } = await supabaseRI
            .from('iterate_claim_tokens')
            .update({ revoked_at: now })
            .eq('order_no', orderNo)
            .is('used_at', null)
            .is('revoked_at', null)
            .lte('expires_at', now);
        if (expiredError) {
            throw new Error(`撤销过期 claim token 失败: ${expiredError.message}`);
        }

        // Legacy random tokens cannot be re-created for an idempotent response.
        const { error: legacyError } = await supabaseRI
            .from('iterate_claim_tokens')
            .update({ revoked_at: now })
            .eq('order_no', orderNo)
            .is('used_at', null)
            .is('revoked_at', null)
            .is('token_nonce', null);
        if (legacyError) {
            throw new Error(`撤销旧版 claim token 失败: ${legacyError.message}`);
        }

        const reusable = await findReusableIterateClaimToken(orderNo);
        if (reusable) {
            return {
                claimed: false,
                token: buildIterateClaimToken(orderNo, reusable.license_key, reusable.token_nonce),
            };
        }

        const tokenNonce = crypto.randomBytes(32).toString('hex');
        const token = buildIterateClaimToken(orderNo, licenseKey, tokenNonce);
        const { error } = await supabaseRI
            .from('iterate_claim_tokens')
            .insert([{
                token_hash: hashIterateClaimToken(token),
                token_nonce: tokenNonce,
                order_no: orderNo,
                license_key: licenseKey,
                expires_at: new Date(Date.now() + ITERATE_CLAIM_TOKEN_TTL_MS).toISOString(),
            }]);

        if (!error) {
            return { claimed: false, token };
        }

        // A concurrent status request may have created the unique active row first.
        if (error.code === '23505') {
            const winner = await findReusableIterateClaimToken(orderNo);
            if (winner) {
                return {
                    claimed: false,
                    token: buildIterateClaimToken(orderNo, winner.license_key, winner.token_nonce),
                };
            }
        }

        console.error('❌ 创建 Iterate claim token 失败:', error.message);
        return null;
    } catch (error) {
        console.error('❌ 创建 Iterate claim token 异常:', error.message);
        return null;
    }
}

async function redeemIterateClaimToken(token) {
    if (!supabaseRI) {
        return { success: false, error: '服务不可用' };
    }

    try {
        const tokenHash = hashIterateClaimToken(token);
        const { data, error } = await supabaseRI
            .from('iterate_claim_tokens')
            .select('id, license_key, used_at, revoked_at, expires_at')
            .eq('token_hash', tokenHash)
            .single();

        if (error || !data) {
            return { success: false, error: 'Token 无效' };
        }
        if (data.revoked_at) {
            return { success: false, error: 'Token 已失效' };
        }
        if (data.used_at) {
            return { success: false, error: 'Token 已使用' };
        }
        if (new Date(data.expires_at) < new Date()) {
            return { success: false, error: 'Token 已过期' };
        }

        const { data: consumedRows, error: consumeError } = await supabaseRI
            .from('iterate_claim_tokens')
            .update({ used_at: new Date().toISOString() })
            .eq('id', data.id)
            .is('used_at', null)
            .is('revoked_at', null)
            .select('license_key');

        if (consumeError) {
            return { success: false, error: 'Token 消费失败' };
        }
        if (!consumedRows || consumedRows.length === 0) {
            return { success: false, error: 'Token 已使用或已失效' };
        }

        return { success: true, licenseKey: consumedRows[0].license_key };
    } catch (error) {
        console.error('❌ 兑换 Iterate claim token 异常:', error.message);
        return { success: false, error: error.message };
    }
}

async function sendIterateClaimStatus(res, orderNo, licenseKey, paymentMethod = 'wechat') {
    const claimResult = await createIterateClaimToken(orderNo, licenseKey);
    if (!claimResult) {
        return res.status(500).json({ success: false, error: '创建 claim token 失败', orderNo, status: 'error' });
    }
    if (claimResult.claimed) {
        return res.json({ success: true, orderNo, paymentMethod, status: 'claimed', claimToken: null, product: 'iterate' });
    }
    return res.json({
        success: true, orderNo, paymentMethod, status: 'success',
        claimToken: claimResult.token, product: 'iterate',
    });
}

// ============== Iterate API 路由 ==============

app.post('/api/iterate/email-verification/send', async (req, res) => {
    const email = normalizeIterateEmail(req.body?.email);
    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ success: false, error: '邮箱格式无效' });
    }

    const result = await createIterateEmailChallenge(email);
    if (!result.success) {
        return res.status(result.statusCode || 500).json({ success: false, error: result.error });
    }
    return res.json({ success: true });
});

app.post('/api/iterate/email-verification/confirm', async (req, res) => {
    const email = normalizeIterateEmail(req.body?.email);
    const code = typeof req.body?.code === 'string' ? req.body.code.trim() : '';
    if (!email || !isValidEmail(email) || !/^\d{6}$/.test(code)) {
        return res.status(400).json({ success: false, error: '邮箱或验证码格式无效' });
    }

    const result = await confirmIterateEmailChallenge(email, code);
    if (!result.success) {
        return res.status(result.statusCode || 500).json({ success: false, error: result.error });
    }
    return res.json({ success: true, emailVerificationToken: result.verificationToken });
});

app.post('/api/iterate/recover-order-access', async (req, res) => {
    try {
        const orderNo = typeof req.body?.orderNo === 'string' ? req.body.orderNo.trim() : '';
        const email = normalizeIterateEmail(req.body?.email);
        const verificationToken = typeof req.body?.emailVerificationToken === 'string'
            ? req.body.emailVerificationToken.trim()
            : '';
        if (!orderNo || !email || !verificationToken) {
            return res.status(400).json({ success: false, error: '缺少订单号或邮箱验证信息' });
        }
        if (!await consumeIterateEmailVerification(email, verificationToken)) {
            return res.status(403).json({ success: false, error: '邮箱验证已过期，请重新验证' });
        }

        let boundEmail = '';
        let paymentMethod = 'wechat';
        let recoveredAccessMetadata = {};
        const { data: storedOrders, error: orderError } = await supabaseRI
            .from('iterate_orders')
            .select('email, payment_method')
            .eq('order_id', orderNo)
            .limit(1);
        if (orderError) {
            throw new Error(orderError.message);
        }
        if (storedOrders && storedOrders.length > 0) {
            boundEmail = normalizeIterateEmail(storedOrders[0].email);
            paymentMethod = resolveIteratePaymentMethod(storedOrders[0].payment_method || 'wechat');
        }
        if (!boundEmail) {
            const storedAccess = await findIteratePaymentAccessByOrderNo(orderNo);
            if (storedAccess) {
                boundEmail = normalizeIterateEmail(storedAccess.email);
                paymentMethod = resolveIteratePaymentMethod(storedAccess.payment_method || 'wechat');
                recoveredAccessMetadata = createIteratePaymentAccessMetadata(storedAccess);
            } else {
                // Compatibility fallback for historical WeChat orders created before access sessions existed.
                const wechatResult = await queryWechatOrderStatus(orderNo);
                const attachFields = parseIterateAttach(wechatResult.attach || '');
                if (attachFields.product !== 'iterate') {
                    return res.status(404).json({ success: false, error: '未找到匹配的订单' });
                }
                boundEmail = normalizeIterateEmail(attachFields.email);
            }
        }
        if (!boundEmail || boundEmail !== email) {
            return res.status(404).json({ success: false, error: '未找到匹配的订单' });
        }

        const paymentAccessToken = await issueIteratePaymentAccessToken(orderNo, email, recoveredAccessMetadata);
        if (!paymentAccessToken) {
            return res.status(500).json({ success: false, error: '找回会话创建失败' });
        }
        const existingLicense = await getIterateLicenseFromDatabase(orderNo);
        if (!existingLicense) {
            return res.json({ success: true, orderNo, paymentMethod, paymentAccessToken, claimToken: null });
        }

        const claimResult = await createIterateClaimToken(orderNo, existingLicense, {
            allowPreviouslyClaimed: true,
        });
        if (!claimResult || !claimResult.token) {
            return res.status(500).json({ success: false, error: '找回领取凭证创建失败' });
        }
        return res.json({
            success: true,
            orderNo,
            paymentMethod,
            paymentAccessToken,
            claimToken: claimResult.token,
        });
    } catch (error) {
        console.error('找回 Iterate 订单访问异常:', error.message);
        return res.status(500).json({ success: false, error: '找回失败' });
    }
});

// Iterate 创建支付订单
app.post('/api/iterate/create-payment', async (req, res) => {
    try {
        const {
            videoId,
            videoTitle,
            paymentMethod: requestedPaymentMethod = 'wechat',
            couponCode = '',
            email = '',
            emailVerificationToken = '',
        } = req.body;

        if (!videoId || !videoTitle) {
            return res.status(400).json({ success: false, message: '缺少必填字段' });
        }

        const plan = ITERATE_PLANS[videoId];
        if (!plan) {
            return res.status(400).json({ success: false, message: '无效的套餐类型: ' + videoId });
        }

        let pricing;
        try {
            pricing = resolveIteratePricing(plan, couponCode);
        } catch (error) {
            return res.status(error.statusCode || 400).json({ success: false, message: error.message });
        }

        let paymentMethod;
        try {
            paymentMethod = resolveIteratePaymentMethod(requestedPaymentMethod);
        } catch (error) {
            return res.status(error.statusCode || 400).json({ success: false, message: error.message });
        }
        if (paymentMethod === 'alipay' && typeof globalThis.createAlipayPrecreatePayment !== 'function') {
            const error = createMissingIteratePaymentAdapterError(paymentMethod);
            return res.status(error.statusCode).json({ success: false, message: error.message });
        }

        const safeEmail = normalizeIterateEmail(email);
        if (!safeEmail || !isValidEmail(safeEmail)) {
            return res.status(400).json({ success: false, message: '请先填写并验证邮箱' });
        }
        if (!await consumeIterateEmailVerification(safeEmail, String(emailVerificationToken || '').trim())) {
            return res.status(403).json({ success: false, message: '邮箱验证已过期，请重新验证' });
        }

        const orderNo = generateOrderNo('ITERATE');
        const result = await createIterateProviderPayment(paymentMethod, orderNo, plan, pricing, safeEmail);

        if (result.codeUrl) {
            const paymentAccessToken = await issueIteratePaymentAccessToken(orderNo, safeEmail, {
                paymentMethod,
                planId: plan.productId,
                amountCents: pricing.payAmount,
                couponCode: pricing.couponCode,
            });
            if (!paymentAccessToken) {
                return res.status(500).json({ success: false, error: '支付访问会话创建失败' });
            }
            res.json({
                success: true,
                orderNo,
                paymentMethod,
                paymentAccessToken,
                code_url: result.codeUrl,
                codeUrl: result.codeUrl,
                amountCents: pricing.payAmount,
                amount: pricing.payAmount / 100,
                originalAmount: pricing.originalAmount / 100,
                discountAmount: (pricing.originalAmount - pricing.payAmount) / 100,
                couponCode: pricing.couponCode,
                productName: plan.productName,
            });
        } else {
            console.error('Iterate 创建订单失败:', result);
            res.status(500).json({ success: false, error: result.message || '创建订单失败' });
        }
    } catch (error) {
        console.error('Iterate 创建订单异常:', error);
        res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
});

// Iterate 查询支付状态（双层缓存：内存 → Supabase → 支付渠道 API）
app.get('/api/iterate/payment-status/:orderNo', async (req, res) => {
    try {
        const { orderNo } = req.params;
        const paymentAccess = await getIteratePaymentAccess(req, orderNo);
        if (!paymentAccess) {
            return res.status(403).json({ success: false, error: '无权查询该订单', status: 'forbidden' });
        }
        const paymentMethod = resolveIteratePaymentMethod(paymentAccess.payment_method || 'wechat');

        // 第一层：检查内存缓存
        const cached = iterateOrderCache.get(orderNo);
        if (cached && cached.licenseKey) {
            return sendIterateClaimStatus(res, orderNo, cached.licenseKey, paymentMethod);
        }

        // 第二层：检查 Supabase 数据库
        const dbLicense = await getIterateLicenseFromDatabase(orderNo);
        if (dbLicense) {
            // 回填内存缓存
            iterateOrderCache.set(orderNo, { licenseKey: dbLicense, createdAt: Date.now() });
            return sendIterateClaimStatus(res, orderNo, dbLicense, paymentMethod);
        }

        // 第三层：按创建订单时持久化的渠道查询供应商支付状态。
        const paymentResult = await queryIterateProviderPaymentStatus(paymentMethod, orderNo);

        if (paymentResult.trade_state === 'SUCCESS') {
            if (paymentMethod === 'wechat'
                && (paymentResult.mchid !== WECHAT_CONFIG.mchid || paymentResult.appid !== WECHAT_CONFIG.appid)) {
                console.error('❌ Iterate 微信响应验证失败: mchid/appid 不匹配');
                return res.status(400).json({ success: false, error: '支付验证失败', status: 'error' });
            }

            // 旧微信订单可从 attach 回填，新订单优先使用访问会话中锁定的字段。
            const attach = paymentResult.attach || '';
            const attachFields = parseIterateAttach(attach);
            const planId = paymentAccess.plan_id || attachFields.plan || null;
            let resolvedPlan = planId ? ITERATE_PLANS[planId] : null;
            let resolvedPricing = null;

            if (!resolvedPlan) {
                const paidAmount = paymentResult.amount?.total;
                resolvedPlan = Object.values(ITERATE_PLANS).find((p) => {
                    if (p.amount === paidAmount) return true;
                    return Object.values(ITERATE_COUPONS).some(coupon => coupon.productId === p.productId && coupon.amount === paidAmount);
                });
                if (!resolvedPlan) {
                    console.error('❌ Iterate 无法匹配套餐, attach:', attach, 'amount:', paidAmount);
                    return res.status(400).json({ success: false, error: '无法确定套餐类型', status: 'error' });
                }
            }

            try {
                resolvedPricing = resolveIteratePricing(resolvedPlan, paymentAccess.coupon_code || attachFields.coupon || '');
            } catch (error) {
                console.error('❌ Iterate 优惠码验证失败:', error.message, 'attach:', attach);
                return res.status(400).json({ success: false, error: '优惠码验证失败', status: 'error' });
            }

            const storedAmount = Number(paymentAccess.amount_cents);
            const expectedAmount = Number.isInteger(storedAmount) && storedAmount > 0
                ? storedAmount
                : Number.parseInt(attachFields.payAmount || '', 10) || resolvedPricing.payAmount;
            if (paymentResult.amount?.total !== expectedAmount) {
                console.error('❌ Iterate 金额不匹配:', paymentResult.amount?.total, 'vs', expectedAmount);
                return res.status(400).json({ success: false, error: '支付金额验证失败', status: 'error' });
            }

            // 再次检查缓存（防止并发重复生成）
            const rechecked = iterateOrderCache.get(orderNo);
            if (rechecked && rechecked.licenseKey) {
                return sendIterateClaimStatus(res, orderNo, rechecked.licenseKey, paymentMethod);
            }

            const email = normalizeIterateEmail(paymentAccess.email || attachFields.email || '');

            const issuedAt = paymentResult.success_time || paymentResult.update_time;
            if (!issuedAt) {
                console.error('❌ Iterate 支付成功响应缺少稳定签发时间，拒绝生成激活码');
                return res.status(400).json({ success: false, error: '支付签发信息不完整', status: 'error' });
            }

            // 同一订单稳定生成同一签名激活码，避免跨实例并发签发出不同权益。
            const generatedLicenseKey = generateIterateLicenseKey(resolvedPlan.licenseType, {
                issuedAt,
                nonce: orderNo,
                orderId: orderNo,
            });
            const saved = await saveIterateLicenseToDatabase(generatedLicenseKey, orderNo, email, resolvedPlan, resolvedPricing, paymentMethod);
            if (!saved.success || !saved.licenseKey) {
                console.error('❌ Iterate License 持久化失败，拒绝签发 claim token:', saved.error);
                return res.status(500).json({ success: false, error: '激活码生成失败', orderNo, status: 'error' });
            }
            const licenseKey = saved.licenseKey;

            iterateOrderCache.set(orderNo, {
                licenseKey, plan: resolvedPlan, pricing: resolvedPricing, createdAt: Date.now(),
            });

            console.log('✅ Iterate 激活码已生成，订单:', orderNo, '套餐:', resolvedPlan.productId);

            if (iterateOrderCache.size > 100) {
                cleanIterateOrderCache();
            }

            return sendIterateClaimStatus(res, orderNo, licenseKey, paymentMethod);
        } else if (paymentResult.trade_state === 'NOTPAY' || paymentResult.trade_state === 'USERPAYING') {
            return res.json({ success: true, orderNo, paymentMethod, status: 'pending', claimToken: null, product: 'iterate' });
        } else if (paymentResult.code) {
            return res.json({ success: true, orderNo, paymentMethod, status: 'pending', claimToken: null, product: 'iterate' });
        } else {
            return res.json({ success: true, orderNo, paymentMethod, status: paymentResult.trade_state?.toLowerCase() || 'unknown', claimToken: null, product: 'iterate' });
        }
    } catch (error) {
        console.error('Iterate 查询支付状态异常:', error);
        res.status(error.statusCode || 500).json({ success: false, error: error.message, orderNo: req.params.orderNo, status: 'error' });
    }
});

app.post('/api/iterate/claim-license', async (req, res) => {
    try {
        const { claimToken } = req.body || {};
        if (!claimToken || typeof claimToken !== 'string') {
            return res.status(400).json({ success: false, error: '缺少 claimToken' });
        }

        const claimResult = await redeemIterateClaimToken(claimToken.trim());
        if (!claimResult.success) {
            return res.status(400).json({ success: false, error: claimResult.error || 'Token 无效' });
        }

        return res.json({
            success: true,
            licenseKey: claimResult.licenseKey,
            product: 'iterate',
        });
    } catch (error) {
        console.error('兑换 Iterate License 异常:', error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

// Iterate 验证激活码（客户端激活时调用）
app.get('/api/iterate/validate-license/:key', async (req, res) => {
    try {
        const { key } = req.params;
        if (!key || key.length < 10) {
            return res.status(400).json({ valid: false, error: '激活码格式无效' });
        }

        // 查询 Supabase
        if (!supabaseRI) {
            console.warn('⚠️ Supabase 未初始化，无法验证激活码');
            return res.status(503).json({ valid: false, error: '验证服务暂不可用' });
        }

        const { data, error } = await supabaseRI
            .from('iterate_licenses')
            .select('license_key, license_type, status, expires_at')
            .eq('license_key', key)
            .single();

        if (error || !data) {
            return res.json({ valid: false, error: '激活码不存在' });
        }

        if (data.status === 'revoked') {
            return res.json({ valid: false, error: '激活码已被吊销' });
        }

        // 检查是否过期（仅限有时限的激活码）
        if (data.expires_at) {
            const expiresAt = new Date(data.expires_at);
            if (expiresAt < new Date()) {
                return res.json({ valid: false, error: '激活码已过期' });
            }
        }

        return res.json({
            valid: true,
            license_type: data.license_type,
            status: data.status,
        });
    } catch (error) {
        console.error('验证激活码异常:', error);
        res.status(500).json({ valid: false, error: '服务器错误' });
    }
});

// Iterate 支付回调（微信异步通知）
app.post('/api/iterate/payment-notify', async (req, res) => {
    try {
        console.log('收到 Iterate 支付回调');
        res.json({ code: 'SUCCESS', message: '成功' });
    } catch (error) {
        console.error('处理 Iterate 支付回调异常:', error.message);
        res.status(500).json({ code: 'FAIL', message: error.message });
    }
});
