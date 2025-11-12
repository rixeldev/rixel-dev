import type { APIContext } from 'astro'
import { getAdminSession } from '@/libs/adminSession'
import { deleteGalleryPhoto } from '@/services/galleries'

export async function DELETE({ params, request }: APIContext) {
	const session = getAdminSession(request)

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
	}

	const galleryId = params.id
	const photoId = params.photoId

	if (!galleryId || !photoId) {
		return new Response(JSON.stringify({ message: 'Gallery ID and Photo ID are required.' }), { status: 400 })
	}

	try {
		await deleteGalleryPhoto({ galleryId, photoId })

		return new Response(null, { status: 204 })
	} catch (error) {
		console.error('Error deleting gallery photo:', error)
		return new Response(JSON.stringify({ message: 'Failed to delete photo.' }), { status: 500 })
	}
}

