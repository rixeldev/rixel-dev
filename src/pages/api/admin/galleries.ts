import { getAdminSession } from '@/libs/adminSession'
import { createGallery, getGalleriesOverview } from '@/services/galleries'

export async function GET({ request }: { request: Request }) {
	const session = getAdminSession(request)

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
	}

	try {
		const data = await getGalleriesOverview()
		return new Response(JSON.stringify({ data }), {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error fetching galleries:', error)
		return new Response(JSON.stringify({ message: 'Failed to load galleries.' }), { status: 500 })
	}
}

export async function POST({ request }: { request: Request }) {
	const session = getAdminSession(request)

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
	}

	try {
		const body = await request.json()
		const title = typeof body.title === 'string' ? body.title.trim() : ''
		const description =
			typeof body.description === 'string' && body.description.trim().length > 0
				? body.description.trim()
				: undefined
		const eventDate =
			typeof body.eventDate === 'string' && body.eventDate.trim().length > 0
				? body.eventDate.trim()
				: undefined

		if (!title) {
			return new Response(JSON.stringify({ message: 'Title is required.' }), {
				status: 400,
			})
		}

		const { gallery, pin } = await createGallery({ title, description, eventDate })

		return new Response(JSON.stringify({ gallery, pin }), {
			status: 201,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error creating gallery:', error)

		return new Response(JSON.stringify({ message: 'Failed to create gallery.' }), {
			status: 500,
		})
	}
}

