import crypto from 'node:crypto'

const LICENSE_CODE_PREFIX = 'ITL1'

function base64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function normalizeLicenseType(input) {
  const value = String(input || '').trim().toLowerCase()
  if (['day1', '1d', '1-day', 't1'].includes(value))
    return 'day1'
  if (['day7', '7d', '7-day', 't7'].includes(value))
    return 'day7'
  if (['permanent', 'lifetime', 'forever', 'p'].includes(value))
    return 'permanent'
  throw new Error(`不支持的激活码类型: ${input}`)
}

export function isLicenseSigningConfigured() {
  return Boolean(process.env.ITERATE_LICENSE_PRIVATE_KEY_B64)
}

export function buildLicensePayload(licenseType) {
  return {
    version: 1,
    product: 'iterate',
    license_type: normalizeLicenseType(licenseType),
    issued_at: new Date().toISOString(),
    nonce: crypto.randomUUID(),
  }
}

export function generateLicenseCode(licenseType) {
  const privateKeyB64 = process.env.ITERATE_LICENSE_PRIVATE_KEY_B64
  if (!privateKeyB64) {
    throw new Error('缺少 ITERATE_LICENSE_PRIVATE_KEY_B64')
  }

  const payload = buildLicensePayload(licenseType)
  const payloadBytes = Buffer.from(JSON.stringify(payload))
  const privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKeyB64, 'base64'),
    format: 'der',
    type: 'pkcs8',
  })
  const signature = crypto.sign(null, payloadBytes, privateKey)

  return `${LICENSE_CODE_PREFIX}.${base64Url(payloadBytes)}.${base64Url(signature)}`
}

export function mapProductSkuToLicenseType(productSku) {
  const sku = String(productSku || '').trim().toLowerCase()
  if (!sku)
    throw new Error('缺少 productSku')

  if (sku.includes('day1') || sku.includes('1d') || sku.includes('trial-1'))
    return 'day1'
  if (sku.includes('day7') || sku.includes('7d') || sku.includes('trial-7'))
    return 'day7'
  if (sku.includes('permanent') || sku.includes('lifetime') || sku.includes('forever'))
    return 'permanent'

  throw new Error(`无法从 productSku 推断授权类型: ${productSku}`)
}
