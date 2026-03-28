import { mapProductSkuToLicenseType } from './licenseService.js'

function firstNonEmpty(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== '')
      return String(value).trim()
  }
  return null
}

export function extractOrderFromPayload(payload = {}) {
  const externalOrderId = firstNonEmpty(
    payload.externalOrderId,
    payload.external_order_id,
    payload.orderId,
    payload.order_id,
    payload.orderNo,
    payload.order_no,
    payload.id,
  )

  if (!externalOrderId)
    throw new Error('支付请求缺少订单号')

  const buyerEmail = firstNonEmpty(
    payload.buyerEmail,
    payload.buyer_email,
    payload.email,
    payload.customer_email,
  )

  const productSku = firstNonEmpty(
    payload.productSku,
    payload.product_sku,
    payload.variant,
    payload.plan,
    payload.licenseType,
    payload.license_type,
  )

  if (!productSku)
    throw new Error('支付请求缺少商品信息')

  return {
    provider: firstNonEmpty(payload.provider, payload.channel, 'manual'),
    externalOrderId,
    buyerEmail,
    productSku,
    licenseType: mapProductSkuToLicenseType(productSku),
    rawPayload: payload,
  }
}
