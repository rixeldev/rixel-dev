import { parse, serialize } from 'cookie'
import jwt from 'jsonwebtoken'

const SESSION_COOKIE = 'admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 12 // 12 hours

function getSecret() {
	const secret = import.meta.env.ADMIN_SESSION_SECRET
	if (!secret) {
		throw new Error('ADMIN_SESSION_SECRET is not defined in environment variables.')
	}
	return secret
}

interface AdminTokenPayload {
	username: string
	iat: number
	exp: number
}

export function createAdminSessionCookie(username: string) {
	const token = jwt.sign({ username }, getSecret(), { expiresIn: SESSION_DURATION_SECONDS })

	return serialize(SESSION_COOKIE, token, {
		httpOnly: true,
		path: '/',
		maxAge: SESSION_DURATION_SECONDS,
		secure: import.meta.env.PROD,
		sameSite: 'lax',
	})
}

export function clearAdminSessionCookie() {
	return serialize(SESSION_COOKIE, '', {
		httpOnly: true,
		path: '/',
		maxAge: 0,
		secure: import.meta.env.PROD,
		sameSite: 'lax',
	})
}

export function getAdminSession(request: Request) {
	const cookieHeader = request.headers.get('cookie')
	if (!cookieHeader) return null

	const cookies = parse(cookieHeader)
	const token = cookies[SESSION_COOKIE]

	if (!token) return null

	try {
		const payload = jwt.verify(token, getSecret()) as AdminTokenPayload
		return { username: payload.username }
	} catch (error) {
		return null
	}
}

