import { hashValue, json, requestIp, requestUserAgent, safeJsonParse } from './_invite-utils.js'
import { getApplicationByInviteCode, insertInviteClick, isSupabaseConfigured } from './_supabase.js'

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS')
    return json(200, { ok: true })

  if (event.httpMethod !== 'POST')
    return json(405, { error: 'Method not allowed' })

  if (!isSupabaseConfigured()) {
    return json(500, { error: '邀请服务未配置好 Supabase 环境变量' })
  }

  const payload = safeJsonParse(event.body)
  const inviteCode = String(payload?.inviteCode || '').trim().toLowerCase()

  if (!inviteCode)
    return json(400, { error: '缺少 inviteCode' })

  const inviter = await getApplicationByInviteCode(inviteCode)
  if (!inviter)
    return json(404, { error: '邀请码不存在' })

  const ipHash = hashValue(`ip:${requestIp(event.headers)}`)
  const userAgentHash = hashValue(`ua:${requestUserAgent(event.headers)}`)

  await insertInviteClick({
    invite_code: inviteCode,
    landing_path: String(payload?.path || '/iterate/index.html'),
    ip_hash: ipHash,
    user_agent_hash: userAgentHash,
    metadata: {
      source: 'iterate-landing',
    },
  })

  return json(200, { ok: true })
}
