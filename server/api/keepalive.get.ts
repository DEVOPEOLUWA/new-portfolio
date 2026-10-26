// Free Supabase projects pause after a week with no traffic. Vercel Cron hits
// this once a day (see vercel.json) with a tiny read so the database stays awake.
export default defineEventHandler(async (event) => {
  const { supabaseUrl, supabaseAnonKey } = useRuntimeConfig().public
  if (!supabaseUrl || !supabaseAnonKey) return { ok: false, reason: 'Supabase env vars not set' }

  try {
    await $fetch(`${supabaseUrl}/rest/v1/guestbook?select=id&limit=1`, {
      headers: { apikey: supabaseAnonKey as string, Authorization: `Bearer ${supabaseAnonKey}` },
    })
    return { ok: true, at: new Date().toISOString() }
  } catch (err: any) {
    setResponseStatus(event, 502)
    return { ok: false, reason: err?.message ?? 'unreachable' }
  }
})
