import { getAdminSession } from '@/libs/adminSession'

export async function GET({ request }: { request: Request }) {
	const session = getAdminSession(request)

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
	}

	return new Response(JSON.stringify(session), {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

