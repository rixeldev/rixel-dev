import type { APIContext } from 'astro'
import { getAdminSession } from '@/libs/adminSession'
import { uploadGalleryPhotos } from '@/services/galleries'

export async function POST({ params, request }: APIContext) {
	const session = getAdminSession(request)

	if (!session) {
		return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
	}

	const galleryId = params.id

	if (!galleryId) {
		return new Response(JSON.stringify({ message: 'Gallery ID is required.' }), { status: 400 })
	}

	try {
		const formData = await request.formData()
		const files = formData
			.getAll('files')
			.filter((value): value is File => value instanceof File)

		if (files.length === 0) {
			const singleFile = formData.get('file')
			if (singleFile instanceof File) {
				files.push(singleFile)
			}
		}

		if (files.length === 0) {
			return new Response(JSON.stringify({ message: 'At least one file must be provided.' }), {
				status: 400,
			})
		}

		const photos = await uploadGalleryPhotos({ galleryId, files })

		return new Response(JSON.stringify({ photos }), {
			status: 201,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error uploading gallery photo:', error)
		return new Response(JSON.stringify({ message: 'Failed to upload photo.' }), {
			status: 500,
		})
	}
}

