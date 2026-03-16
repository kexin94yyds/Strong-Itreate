import {
  hashValue,
  json,
  normalizeContact,
  randomInviteCode,
  requestIp,
  requestUserAgent,
  safeJsonParse,
  verifyTurnstileToken,
} from './_invite-utils.js'
import {
  getApplicationByContactHash,
  getApplicationByInviteCode,
  insertApplication,
  isSupabaseConfigured,
  listApplicationsByInviter,
  listRecentApplicationsByIpHash,
} from './_supabase.js'

const APPLICATION_LIMIT_WINDOW_MS = 60 * 60 * 1000
const APPLICATION_LIMIT_PER_IP = 5

function buildInviteUrl(origin, code) {
  const siteOrigin = origin || 'https://iterate.xin'
  return `${siteOrigin.replace(/\/$/, '')}/iterate/index.html?ref=${code}`
}

function isContactHashConflict(error) {
  const message = String(error?.message || '')
  return message.includes('duplicate key value violates unique constraint')
    && message.includes('contact_hash')
}

async function buildStatus(application) {
  const referrals = await listApplicationsByInviter(application.id)
  const qualifiedCount = referrals.filter(item => item.referral_status === 'qualified').length

  return {
    inviteCode: application.invite_code,
    inviteLink: buildInviteUrl('', application.invite_code),
    applicationStatus: application.application_status,
    referralStatus: application.referral_status,
    qualifiedInviteCount: qualifiedCount,
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS')
    return json(200, { ok: true })

  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Method not allowed' })

  if (!isSupabaseConfigured()) {
    return json(500, { error: '邀请服务未配置好 Supabase 环境变量' })
  }

  const payload = safeJsonParse(event.body)
  if (!payload) {
    return json(400, { error: '请求体不是合法 JSON' })
  }

  try {
    const contactType = String(payload.contactType || '').trim().toLowerCase()
    const contactValue = normalizeContact(contactType, payload.contactValue)
    const usageNote = String(payload.usageNote || '').trim()
    let referralCode = String(payload.referralCode || '').trim().toLowerCase() || null
    const turnstileToken = String(payload.turnstileToken || '').trim()

    if (usageNote.length < 8) {
      return json(400, { error: '请简单描述你的使用场景，至少 8 个字' })
    }

    const contactHash = hashValue(`${contactType}:${contactValue}`)
    const existing = await getApplicationByContactHash(contactHash)
    if (existing) {
      return json(200, {
        ok: true,
        duplicate: true,
        message: '你之前已经提交过申请，已返回现有邀请信息',
        data: await buildStatus(existing),
      })
    }

    const ipHash = hashValue(`ip:${requestIp(event.headers)}`)
    const userAgentHash = hashValue(`ua:${requestUserAgent(event.headers)}`)

    const recentApplications = await listRecentApplicationsByIpHash(
      ipHash,
      new Date(Date.now() - APPLICATION_LIMIT_WINDOW_MS).toISOString(),
    )
    if (recentApplications.length >= APPLICATION_LIMIT_PER_IP) {
      return json(429, { error: '提交过于频繁，请 1 小时后再试' })
    }

    const turnstileCheck = await verifyTurnstileToken(turnstileToken, requestIp(event.headers))
    if (!turnstileCheck.success) {
      return json(400, { error: turnstileCheck.error || '人机校验未通过，请重试' })
    }

    let inviter = null
    if (referralCode) {
      inviter = await getApplicationByInviteCode(referralCode)
      if (!inviter) {
        referralCode = null
      }
    }

    let inviteCode = randomInviteCode()
    while (await getApplicationByInviteCode(inviteCode)) {
      inviteCode = randomInviteCode()
    }

    let referralStatus = 'none'
    let inviterApplicationId = null
    if (inviter) {
      if (inviter.contact_hash === contactHash) {
        referralStatus = 'self_referral'
      }
      else {
        referralStatus = 'qualified'
        inviterApplicationId = inviter.id
      }
    }

    let created
    try {
      created = await insertApplication({
        invite_code: inviteCode,
        contact_type: contactType,
        contact_value: contactValue,
        contact_hash: contactHash,
        usage_note: usageNote,
        referral_code: referralCode,
        inviter_application_id: inviterApplicationId,
        application_status: 'submitted',
        referral_status: referralStatus,
        ip_hash: ipHash,
        user_agent_hash: userAgentHash,
        qualified_at: referralStatus === 'qualified' ? new Date().toISOString() : null,
        metadata: {
          source: 'iterate-landing',
        },
      })
    }
    catch (error) {
      if (isContactHashConflict(error)) {
        const duplicated = await getApplicationByContactHash(contactHash)
        if (duplicated) {
          return json(200, {
            ok: true,
            duplicate: true,
            message: '你之前已经提交过申请，已返回现有邀请信息',
            data: await buildStatus(duplicated),
          })
        }
      }

      throw error
    }

    return json(200, {
      ok: true,
      duplicate: false,
      message: '申请已提交',
      data: {
        inviteCode: created.invite_code,
        inviteLink: buildInviteUrl(event.headers.origin, created.invite_code),
        applicationStatus: created.application_status,
        referralStatus: created.referral_status,
        qualifiedInviteCount: 0,
      },
    })
  }
  catch (error) {
    return json(500, { error: error.message || '申请提交失败' })
  }
}
