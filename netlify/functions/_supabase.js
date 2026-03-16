import { getEnv } from './_invite-utils.js'

const SUPABASE_URL = getEnv(['SUPABASE_RI_URL', 'SUPABASE_URL'])
const SUPABASE_SERVICE_KEY = getEnv([
  'SUPABASE_RI_SERVICE_ROLE_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SERVICE_KEY',
])

function assertSupabase() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('缺少 Supabase 环境变量')
  }
}

async function supabaseFetch(path, options = {}) {
  assertSupabase()

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Supabase 请求失败: ${response.status} ${text}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY)
}

export async function getApplicationByInviteCode(inviteCode) {
  const rows = await supabaseFetch(`/rest/v1/iterate_beta_applications?invite_code=eq.${encodeURIComponent(inviteCode)}&select=*`)
  return rows?.[0] || null
}

export async function getApplicationByContactHash(contactHash) {
  const rows = await supabaseFetch(`/rest/v1/iterate_beta_applications?contact_hash=eq.${encodeURIComponent(contactHash)}&select=*`)
  return rows?.[0] || null
}

export async function insertApplication(payload) {
  const rows = await supabaseFetch('/rest/v1/iterate_beta_applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return rows?.[0] || null
}

export async function insertInviteClick(payload) {
  const rows = await supabaseFetch('/rest/v1/iterate_beta_invite_clicks?on_conflict=invite_code,ip_hash,user_agent_hash', {
    method: 'POST',
    headers: {
      Prefer: 'resolution=ignore-duplicates,return=representation',
    },
    body: JSON.stringify(payload),
  })
  return rows?.[0] || null
}

export async function listApplicationsByInviter(inviterId) {
  return supabaseFetch(`/rest/v1/iterate_beta_applications?inviter_application_id=eq.${encodeURIComponent(inviterId)}&select=*`)
}

export async function listClicksByInviteCode(inviteCode) {
  return supabaseFetch(`/rest/v1/iterate_beta_invite_clicks?invite_code=eq.${encodeURIComponent(inviteCode)}&select=*`)
}

export async function listRecentApplicationsByIpHash(ipHash, sinceIso) {
  return supabaseFetch(`/rest/v1/iterate_beta_applications?ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(sinceIso)}&select=id`)
}

export async function listRecentClicksByIpHash(ipHash, sinceIso) {
  return supabaseFetch(`/rest/v1/iterate_beta_invite_clicks?ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(sinceIso)}&select=id`)
}

export async function listApplicationsForAdmin({ search = '', status = '' } = {}) {
  const filters = ['select=*', 'order=created_at.desc']

  if (search) {
    const encoded = encodeURIComponent(`%${search}%`)
    filters.push(`or=(contact_value.ilike.${encoded},usage_note.ilike.${encoded},invite_code.ilike.${encoded})`)
  }

  if (status && status !== 'all') {
    filters.push(`application_status=eq.${encodeURIComponent(status)}`)
  }

  return supabaseFetch(`/rest/v1/iterate_beta_applications?${filters.join('&')}`)
}

export async function updateApplicationStatus(id, status) {
  const rows = await supabaseFetch(`/rest/v1/iterate_beta_applications?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({
      application_status: status,
    }),
  })

  return rows?.[0] || null
}
