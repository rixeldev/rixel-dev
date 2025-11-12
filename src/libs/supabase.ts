import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let serviceClient: SupabaseClient | null = null

export function getSupabaseService() {
	if (!serviceClient) {
		const supabaseUrl = import.meta.env.SUPABASE_URL
		const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY

		if (!supabaseUrl || !supabaseServiceKey) {
			throw new Error('Supabase environment variables are not configured.')
		}

		serviceClient = createClient(supabaseUrl, supabaseServiceKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
			},
		})
	}

	return serviceClient
}

