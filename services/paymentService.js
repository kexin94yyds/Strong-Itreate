import { mapProductSkuToLicenseType } from './licenseService.js'

function firstNonEmpty(...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && String(value).trim() !== '')
      return String(value).trim()
  }
  return null
}

function pickPath(source, path) {
  const segments = path.split('.')
  let current = source

  for (const segment of segments) {
    if (current === null || current === undefined)
      return null

    if (segment === '0') {
      if (!Array.isArray(current) || current.length === 0)
        return null
      current = current[0]
      continue
    }

    current = current[segment]
  }

  return current
}

function firstPath(source, ...paths) {
  for (const path of paths) {
    const value = pickPath(source, path)
    if (value !== undefined && value !== null && String(value).trim() !== '')
      return String(value).trim()
  }
  return null
}

function detectProvider(payload = {}) {
  const explicit = firstNonEmpty(payload.provider, payload.channel)
  if (explicit)
    return explicit

  const eventName = firstPath(payload, 'meta.event_name', 'event_type', 'eventType')
  if (eventName?.startsWith('order_'))
    return 'lemonsqueezy'

  if (firstPath(payload, 'data.customer.email', 'data.items.0.price.name'))
    return 'paddle'

  return 'manual'
}

function derivePaymentStatus(payload = {}, provider) {
  const rawStatus = firstNonEmpty(
    payload.paymentStatus,
    payload.payment_status,
    firstPath(payload, 'meta.event_name'),
    firstPath(payload, 'data.attributes.status'),
    firstPath(payload, 'data.status'),
  )

  const value = String(rawStatus || '').trim().toLowerCase()
  if (!value)
    return 'paid'

  if (value.includes('refund'))
    return 'refunded'
  if (value.includes('fail') || value.includes('declin') || value.includes('cancel'))
    return 'failed'
  if (value.includes('paid') || value.includes('success') || value.includes('created') || value.includes('order_created'))
    return 'paid'

  if (provider === 'lemonsqueezy' && value === 'order_created')
    return 'paid'

  return 'paid'
}

export function extractOrderFromPayload(payload = {}) {
  const provider = detectProvider(payload)
  const externalOrderId = firstNonEmpty(
    payload.externalOrderId,
    payload.external_order_id,
    payload.orderId,
    payload.order_id,
    payload.orderNo,
    payload.order_no,
    payload.id,
    firstPath(payload, 'data.id'),
    firstPath(payload, 'data.attributes.identifier'),
    firstPath(payload, 'data.attributes.order_number'),
    firstPath(payload, 'data.attributes.order_id'),
  )

  if (!externalOrderId)
    throw new Error('支付请求缺少订单号')

  const buyerEmail = firstNonEmpty(
    payload.buyerEmail,
    payload.buyer_email,
    payload.email,
    payload.customer_email,
    firstPath(payload, 'data.attributes.user_email'),
    firstPath(payload, 'data.attributes.customer_email'),
    firstPath(payload, 'data.customer.email'),
    firstPath(payload, 'customer.email'),
  )

  const productSku = firstNonEmpty(
    payload.productSku,
    payload.product_sku,
    payload.variant,
    payload.plan,
    payload.licenseType,
    payload.license_type,
    firstPath(payload, 'meta.custom_data.productSku'),
    firstPath(payload, 'meta.custom_data.product_sku'),
    firstPath(payload, 'meta.custom_data.licenseType'),
    firstPath(payload, 'meta.custom_data.license_type'),
    firstPath(payload, 'data.attributes.first_order_item.variant_name'),
    firstPath(payload, 'data.attributes.first_order_item.product_name'),
    firstPath(payload, 'data.attributes.variant_name'),
    firstPath(payload, 'data.attributes.product_name'),
    firstPath(payload, 'data.items.0.price.name'),
    firstPath(payload, 'data.items.0.product.name'),
    firstPath(payload, 'items.0.price.name'),
    firstPath(payload, 'items.0.product.name'),
  )

  if (!productSku)
    throw new Error('支付请求缺少商品信息')

  return {
    provider,
    externalOrderId,
    buyerEmail,
    productSku,
    licenseType: mapProductSkuToLicenseType(productSku),
    paymentStatus: derivePaymentStatus(payload, provider),
    rawPayload: payload,
  }
}
