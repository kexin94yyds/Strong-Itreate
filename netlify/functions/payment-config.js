import { getEnv, json } from './_invite-utils.js'

function checkoutOption(id, envNames, fallbackLabel, fallbackDescription) {
  const url = getEnv(envNames)

  return {
    id,
    url: url || '',
    enabled: Boolean(url),
    label: fallbackLabel,
    description: fallbackDescription,
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'GET')
    return json(405, { error: 'Method not allowed' })

  return json(200, {
    ok: true,
    data: {
      options: [
        checkoutOption('day1', ['ITERATE_CHECKOUT_URL_DAY1', 'PUBLIC_ITERATE_CHECKOUT_URL_DAY1'], '1 天体验', '先跑通一轮真实工作流，适合快速验证。'),
        checkoutOption('day7', ['ITERATE_CHECKOUT_URL_DAY7', 'PUBLIC_ITERATE_CHECKOUT_URL_DAY7'], '7 天体验', '连续几天高频使用，适合真实工作链路。'),
        checkoutOption('permanent', ['ITERATE_CHECKOUT_URL_PERMANENT', 'PUBLIC_ITERATE_CHECKOUT_URL_PERMANENT'], '永久授权', '直接长期使用，不再反复切换版本。'),
      ],
      supportText: getEnv(['ITERATE_PAYMENT_SUPPORT_TEXT', 'PUBLIC_ITERATE_PAYMENT_SUPPORT_TEXT']) || '支付成功后自动发放激活码。若当场没出码，保留订单号，稍后回到领取页恢复即可。',
    },
  })
}
