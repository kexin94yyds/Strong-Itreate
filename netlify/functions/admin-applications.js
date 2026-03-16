import { getAdminToken, json } from './_invite-utils.js'
import {
  isSupabaseConfigured,
  listApplicationsByInviter,
  listApplicationsForAdmin,
  updateApplicationStatus,
} from './_supabase.js'

function isAuthorized(headers = {}) {
  const expected = getAdminToken()
  const provided = headers['x-admin-token'] || headers['X-Admin-Token'] || ''
  return Boolean(expected) && provided === expected
}

function unauthorized() {
  return json(401, { error: '未授权，请先输入后台访问口令' })
}

async function listHandler(event) {
  const search = String(event.queryStringParameters?.search || '').trim()
  const status = String(event.queryStringParameters?.status || 'all').trim().toLowerCase()
  const applications = await listApplicationsForAdmin({ search, status })

  const rows = await Promise.all(applications.map(async (application) => {
    const referrals = await listApplicationsByInviter(application.id)
    const qualifiedInviteCount = referrals.filter(item => item.referral_status === 'qualified').length

    return {
      id: application.id,
      createdAt: application.created_at,
      contactType: application.contact_type,
      contactValue: application.contact_value,
      usageNote: application.usage_note,
      inviteCode: application.invite_code,
      referralCode: application.referral_code,
      applicationStatus: application.application_status,
      referralStatus: application.referral_status,
      qualifiedInviteCount,
    }
  }))

  return json(200, { ok: true, data: rows })
}

async function updateHandler(event) {
  const payload = JSON.parse(event.body || '{}')
  const id = String(payload.id || '').trim()
  const status = String(payload.status || '').trim().toLowerCase()

  if (!id || !['approved', 'rejected', 'submitted'].includes(status)) {
    return json(400, { error: '缺少合法的 id 或 status' })
  }

  const updated = await updateApplicationStatus(id, status)
  return json(200, {
    ok: true,
    data: {
      id: updated.id,
      applicationStatus: updated.application_status,
      updatedAt: updated.updated_at,
    },
  })
}

export async function handler(event) {
  if (!isSupabaseConfigured()) {
    return json(500, { error: '邀请服务未配置好 Supabase 环境变量' })
  }

  if (!isAuthorized(event.headers || {})) {
    return unauthorized()
  }

  if (event.httpMethod === 'GET') {
    return listHandler(event)
  }

  if (event.httpMethod === 'POST') {
    return updateHandler(event)
  }

  return json(405, { error: 'Method not allowed' })
}
