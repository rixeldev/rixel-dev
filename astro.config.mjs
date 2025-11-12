/* eslint-disable no-undef */
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'
import react from '@astrojs/react'
import * as dotenv from 'dotenv'

dotenv.config()

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
	vite: {
		define: {
			'import.meta.env.RESEND_API_KEY': JSON.stringify(process.env.RESEND_API_KEY),
			'import.meta.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL),
			'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY),
			'import.meta.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(
				process.env.SUPABASE_SERVICE_ROLE_KEY
			),
			'import.meta.env.SUPABASE_STORAGE_BUCKET': JSON.stringify(
				process.env.SUPABASE_STORAGE_BUCKET
			),
			'import.meta.env.ADMIN_USERNAME': JSON.stringify(process.env.ADMIN_USERNAME),
			'import.meta.env.ADMIN_PASSWORD': JSON.stringify(process.env.ADMIN_PASSWORD),
			'import.meta.env.ADMIN_SESSION_SECRET': JSON.stringify(process.env.ADMIN_SESSION_SECRET),
			'import.meta.env.PIN_HASH_SECRET': JSON.stringify(process.env.PIN_HASH_SECRET),
		},
	},
})
