import { extractOrderFromPayload } from '../../services/paymentService.js'
import { generateLicenseCode, isLicenseSigningConfigured } from '../../services/licenseService.js'
import { json, safeJsonParse } from './_invite-utils.js'
import {
  getLicenseOrderByExternalOrderId,
  insertLicenseOrder,
  isSupabaseConfigured,
} from './_supabase.js'

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS')
    return json(200, { ok: true })

  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Method not allowed' })

  if (!isSupabaseConfigured()) {
    return json(500, { error: '支付服务未配置好 Supabase 环境变量' })
  }

  if (!isLicenseSigningConfigured()) {
    return json(500, { error: '支付服务未配置 ITERATE_LICENSE_PRIVATE_KEY_B64' })
  }

  const payload = safeJsonParse(event.body)
  if (!payload) {
    return json(400, { error: '请求体不是合法 JSON' })
  }

  try {
    const order = extractOrderFromPayload(payload)
    const existing = await getLicenseOrderByExternalOrderId(order.externalOrderId)

    if (existing) {
      return json(200, {
        ok: true,
        duplicate: true,
        data: {
          externalOrderId: existing.external_order_id,
          licenseKey: existing.license_key,
          licenseType: existing.license_type,
          paymentStatus: existing.payment_status,
          deliveryStatus: existing.delivery_status,
        },
      })
    }

    const licenseKey = generateLicenseCode(order.licenseType)
    const created = await insertLicenseOrder({
      provider: order.provider,
      external_order_id: order.externalOrderId,
      buyer_email: order.buyerEmail,
      product_sku: order.productSku,
      license_type: order.licenseType,
      license_key: licenseKey,
      payment_status: 'paid',
      delivery_status: 'issued',
      issued_at: new Date().toISOString(),
      provider_payload: order.rawPayload,
    })

    return json(200, {
      ok: true,
      duplicate: false,
      data: {
        externalOrderId: created.external_order_id,
        licenseKey: created.license_key,
        licenseType: created.license_type,
        paymentStatus: created.payment_status,
        deliveryStatus: created.delivery_status,
      },
    })
  }
  catch (error) {
    return json(500, { error: error.message || '支付 webhook 处理失败' })
  }
}
