import { json } from './_invite-utils.js'
import {
  getLicenseOrderByExternalOrderId,
  isSupabaseConfigured,
} from './_supabase.js'

export async function handler(event) {
  if (event.httpMethod !== 'GET')
    return json(405, { error: 'Method not allowed' })

  if (!isSupabaseConfigured()) {
    return json(500, { error: '支付服务未配置好 Supabase 环境变量' })
  }

  const externalOrderId = String(
    event.queryStringParameters?.orderId
      || event.queryStringParameters?.orderNo
      || event.queryStringParameters?.externalOrderId
      || '',
  ).trim()

  if (!externalOrderId)
    return json(400, { error: '缺少订单号' })

  try {
    const order = await getLicenseOrderByExternalOrderId(externalOrderId)
    if (!order) {
      return json(404, { error: '订单不存在' })
    }

    return json(200, {
      ok: true,
      data: {
        externalOrderId: order.external_order_id,
        paid: order.payment_status === 'paid',
        issued: order.delivery_status === 'issued',
        paymentStatus: order.payment_status,
        deliveryStatus: order.delivery_status,
        licenseKey: order.license_key,
        licenseType: order.license_type,
        buyerEmail: order.buyer_email,
      },
    })
  }
  catch (error) {
    return json(500, { error: error.message || '查询支付状态失败' })
  }
}
