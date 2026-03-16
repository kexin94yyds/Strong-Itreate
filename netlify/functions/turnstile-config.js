import { getTurnstileSiteKey, json } from './_invite-utils.js'

export async function handler() {
  const siteKey = getTurnstileSiteKey()

  return json(200, {
    ok: true,
    data: {
      enabled: Boolean(siteKey),
      siteKey: siteKey || null,
    },
  })
}
