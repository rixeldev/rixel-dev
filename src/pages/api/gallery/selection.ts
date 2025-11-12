import {
	findGalleryByPin,
	listGalleryPhotos,
	saveGallerySelections,
} from '@/services/galleries'

export async function POST({ request }: { request: Request }) {
	try {
		const body = await request.json()
		const pin = typeof body.pin === 'string' ? body.pin.trim() : ''
		const galleryId = typeof body.galleryId === 'string' ? body.galleryId : ''
		const selectedCodes = Array.isArray(body.selectedCodes)
			? body.selectedCodes.map((code: unknown) => String(code))
			: []

		if (!pin || !galleryId) {
			return new Response(JSON.stringify({ message: 'PIN and galleryId are required.' }), {
				status: 400,
			})
		}

		const gallery = await findGalleryByPin(pin)

		if (!gallery || gallery.id !== galleryId) {
			return new Response(JSON.stringify({ message: 'Invalid PIN or gallery ID.' }), {
				status: 401,
			})
		}

		const photos = await listGalleryPhotos(galleryId)
		const validCodes = selectedCodes.filter((code) =>
			photos.some((photo) => photo.image_code === code),
		)

		await saveGallerySelections(galleryId, validCodes)

		return new Response(JSON.stringify({ success: true, selectedCodes: validCodes }), {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		console.error('Error saving gallery selections:', error)
		return new Response(JSON.stringify({ message: 'Unexpected error. Please try again.' }), {
			status: 500,
		})
	}
}

