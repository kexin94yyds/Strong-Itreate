import crypto from 'node:crypto'

const CONTACT_TYPES = new Set(['email', 'wechat'])
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}

export function getEnv(nameCandidates) {
  for (const name of nameCandidates) {
    const value = process.env[name]
    if (value)
      return value
  }
  return null
}

export function normalizeContact(contactType, contactValue) {
  const type = String(contactType || '').trim().toLowerCase()
  const value = String(contactValue || '').trim()

  if (!CONTACT_TYPES.has(type)) {
    throw new Error('不支持的联系方式类型')
  }

  if (type === 'email') {
    const normalized = value.toLowerCase()
    if (!EMAIL_RE.test(normalized)) {
      throw new Error('邮箱格式不正确')
    }
    return normalized
  }

  if (value.length < 2 || value.length > 64) {
    throw new Error('微信号长度不合法')
  }

  return value.toLowerCase().replace(/\s+/g, '')
}

export function hashValue(value) {
  const salt = getEnv(['INVITE_HASH_SALT', 'SUPABASE_RI_HASH_SALT']) || 'iterate-beta-default-salt'
  return crypto
    .createHash('sha256')
    .update(`${salt}:${value}`)
    .digest('hex')
}

export function randomInviteCode() {
  return crypto.randomBytes(5).toString('base64url').toLowerCase()
}

export function requestIp(headers = {}) {
  const forwarded = headers['x-forwarded-for'] || headers['X-Forwarded-For'] || ''
  return forwarded.split(',')[0].trim() || '0.0.0.0'
}

export function requestUserAgent(headers = {}) {
  return headers['user-agent'] || headers['User-Agent'] || 'unknown'
}

export function safeJsonParse(value) {
  try {
    return JSON.parse(value)
  }
  catch {
    return null
  }
}

export function getTurnstileSiteKey() {
  return getEnv(['TURNSTILE_SITE_KEY', 'CF_TURNSTILE_SITE_KEY'])
}

function getTurnstileSecretKey() {
  return getEnv(['TURNSTILE_SECRET_KEY', 'CF_TURNSTILE_SECRET_KEY'])
}

export async function verifyTurnstileToken(token, remoteIp) {
  const secretKey = getTurnstileSecretKey()
  if (!secretKey) {
    return {
      enabled: false,
      success: true,
    }
  }

  if (!token) {
    return {
      enabled: true,
      success: false,
      error: '请先完成人机校验',
    }
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  })

  if (remoteIp) {
    body.set('remoteip', remoteIp)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error('Turnstile 验证请求失败')
  }

  const result = await response.json()
  return {
    enabled: true,
    success: Boolean(result.success),
    error: result.success ? null : '人机校验未通过，请重试',
  }
}
