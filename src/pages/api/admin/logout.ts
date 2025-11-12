import { clearAdminSessionCookie } from '@/libs/adminSession'

export async function POST() {
	const cookie = clearAdminSessionCookie()

	return new Response(null, {
		status: 204,
		headers: {
			'Set-Cookie': cookie,
		},
	})
}

