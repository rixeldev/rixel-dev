/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { ToastOptions } from './lib/toast'

interface Window {
	getThemePreference(): 'dark' | 'light'
	toast({ ToastOptions }: ToastOptions): void
}

interface ImportMetaEnv {
	readonly RESEND_API_KEY: string
	readonly SUPABASE_URL: string
	readonly SUPABASE_ANON_KEY: string
	readonly SUPABASE_SERVICE_ROLE_KEY: string
	readonly SUPABASE_STORAGE_BUCKET?: string
	readonly ADMIN_USERNAME: string
	readonly ADMIN_PASSWORD: string
	readonly ADMIN_SESSION_SECRET: string
	readonly PIN_HASH_SECRET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare global {
	interface Window {
		getThemePreference: function
		toast: function
	}
}
