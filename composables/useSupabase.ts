import { createClient } from '@supabase/supabase-js'

let client: ReturnType<typeof createClient> | null = null

export function useSupabaseClient() {
    const config = useRuntimeConfig()
    const url = config.public.supabaseUrl as string
    const key = config.public.supabaseAnonKey as string

    if (!url || !key || url === 'your_supabase_project_url') {
        return null
    }

    if (!client) {
        client = createClient(url, key)
    }
    return client
}
