import { createAdminSessionCookie } from '@/libs/adminSession'

export async function POST({ request }: { request: Request }) {
	try {
		const adminUsername = import.meta.env.ADMIN_USERNAME
		const adminPassword = import.meta.env.ADMIN_PASSWORD

		if (!adminUsername || !adminPassword) {
			throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be defined.')
		}

		const body = await request.json()

		const username = typeof body.username === 'string' ? body.username.trim() : ''
		const password = typeof body.password === 'string' ? body.password : ''

		if (!username || !password) {
			return new Response(JSON.stringify({ message: 'Username and password are required.' }), {
				status: 400,
			})
		}

		if (username !== adminUsername || password !== adminPassword) {
			return new Response(JSON.stringify({ message: 'Invalid credentials.' }), { status: 401 })
		}

		const cookie = createAdminSessionCookie(username)

		return new Response(JSON.stringify({ username }), {
			headers: {
				'Content-Type': 'application/json',
				'Set-Cookie': cookie,
			},
		})
	} catch (error) {
		console.error('Admin login error:', error)
		return new Response(JSON.stringify({ message: 'Unexpected error. Please try again.' }), {
			status: 500,
		})
	}
}

