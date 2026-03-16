import { json } from './_invite-utils.js'
import {
  getApplicationByInviteCode,
  isSupabaseConfigured,
  listApplicationsByInviter,
  listClicksByInviteCode,
} from './_supabase.js'

export async function handler(event) {
  if (event.httpMethod !== 'GET')
    return json(405, { error: 'Method not allowed' })

  if (!isSupabaseConfigured()) {
    return json(500, { error: '邀请服务未配置好 Supabase 环境变量' })
  }

  const inviteCode = String(event.queryStringParameters?.code || '').trim().toLowerCase()
  if (!inviteCode)
    return json(400, { error: '缺少邀请码' })

  const owner = await getApplicationByInviteCode(inviteCode)
  if (!owner)
    return json(404, { error: '邀请码不存在' })

  const referredApplications = await listApplicationsByInviter(owner.id)
  const clicks = await listClicksByInviteCode(inviteCode)

  const qualifiedInviteCount = referredApplications.filter(item => item.referral_status === 'qualified').length
  const appliedInviteCount = referredApplications.length

  return json(200, {
    ok: true,
    data: {
      inviteCode,
      inviteLink: `${(event.headers.origin || 'https://iterate.xin').replace(/\/$/, '')}/iterate/index.html?ref=${inviteCode}`,
      clickCount: clicks.length,
      appliedInviteCount,
      qualifiedInviteCount,
      targetCount: 3,
      remainingToPriority: Math.max(0, 3 - qualifiedInviteCount),
    },
  })
}
