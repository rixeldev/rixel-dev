import crypto from "node:crypto"
import { getImageDimensionsFromFile } from "@/libs/getImageSizes"
import type { Gallery, GalleryPhoto, PhotoSelection } from "@/interfaces/gallery"
import { hashPin } from "@/libs/pin"
import { getSupabaseService } from "@/libs/supabase"

const photosBucket = import.meta.env.SUPABASE_STORAGE_BUCKET ?? "photos"

function resolvePhotoPublicUrl(storagePath: string) {
	const supabase = getSupabaseService()
	const { data, error } = supabase.storage.from(photosBucket).getPublicUrl(storagePath)

	if (error) {
		throw new Error(`Failed to resolve public URL for ${storagePath}: ${error.message}`)
	}

	return data.publicUrl
}

export async function findGalleryByPin(pin: string) {
	const hashedPin = hashPin(pin)

	const supabase = getSupabaseService()

	const { data, error } = await supabase
		.from<Gallery>('galleries')
		.select('id,title,description,event_date,created_at,pin_hash')
		.eq('pin_hash', hashedPin)
		.single()

	if (error || !data) {
		return null
	}

	const { pin_hash: _pinHash, ...safeData } = data as Gallery & { pin_hash: string }

	return safeData
}

export async function listGalleryPhotos(galleryId: string) {
	const supabase = getSupabaseService()

	const { data, error } = await supabase
		.from<GalleryPhoto>('gallery_photos')
		.select('id,gallery_id,image_code,storage_path,width,height,created_at')
		.eq('gallery_id', galleryId)
		.order('created_at', { ascending: true })

	if (error) {
		throw new Error(error.message)
	}

	return data.map((photo) => ({
		...photo,
		public_url: resolvePhotoPublicUrl(photo.storage_path),
	}))
}

export async function listGallerySelections(galleryId: string) {
	const supabase = getSupabaseService()

	const { data, error } = await supabase
		.from<PhotoSelection>('photo_selections')
		.select('id,gallery_id,image_code,selected_at')
		.eq('gallery_id', galleryId)
		.order('selected_at', { ascending: true })

	if (error) {
		throw new Error(error.message)
	}

	return data
}

export async function saveGallerySelections(galleryId: string, imageCodes: string[]) {
	const supabase = getSupabaseService()

	const { error: deleteError } = await supabase
		.from('photo_selections')
		.delete()
		.eq('gallery_id', galleryId)

	if (deleteError) {
		throw new Error(deleteError.message)
	}

	if (imageCodes.length === 0) {
		return
	}

	const rows = imageCodes.map((code) => ({
		gallery_id: galleryId,
		image_code: code,
	}))

	const { error: insertError } = await supabase.from('photo_selections').insert(rows)

	if (insertError) {
		throw new Error(insertError.message)
	}
}

interface CreateGalleryInput {
	title: string
	description?: string
	eventDate?: string
}

function generatePinCandidate(length = 6) {
	return Array.from({ length })
		.map(() => crypto.randomInt(0, 10))
		.join('')
}

async function generateUniquePin() {
	const supabase = getSupabaseService()

	for (let attempt = 0; attempt < 10; attempt++) {
		const pin = generatePinCandidate()
		const pinHash = hashPin(pin)

		const { data, error } = await supabase
			.from('galleries')
			.select('id')
			.eq('pin_hash', pinHash)
			.limit(1)

		if (error) {
			throw new Error(error.message)
		}

		if (!data || data.length === 0) {
			return { pin, pinHash }
		}
	}

	throw new Error('Unable to generate a unique PIN. Please try again.')
}

export async function createGallery({ title, description, eventDate }: CreateGalleryInput) {
	const supabase = getSupabaseService()
	const { pin, pinHash } = await generateUniquePin()

	const { data, error } = await supabase
		.from('galleries')
		.insert({
			title,
			description: description ?? null,
			event_date: eventDate ?? null,
			pin_hash: pinHash,
		})
		.select('id,title,description,event_date,created_at')
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return { gallery: data, pin }
}

export async function getGalleriesOverview() {
	const supabase = getSupabaseService()

	const { data: galleries, error } = await supabase
		.from<Gallery>('galleries')
		.select('id,title,description,event_date,created_at')
		.order('created_at', { ascending: false })

	if (error) {
		throw new Error(error.message)
	}

	const [photosList, selectionsList] = await Promise.all([
		supabase
			.from<GalleryPhoto>('gallery_photos')
			.select('id,gallery_id,image_code,storage_path,created_at'),
		supabase.from<PhotoSelection>('photo_selections').select('id,gallery_id,image_code,selected_at'),
	])

	if (photosList.error) {
		throw new Error(photosList.error.message)
	}

	if (selectionsList.error) {
		throw new Error(selectionsList.error.message)
	}

	const photosByGallery = new Map<string, GalleryPhoto[]>()
	photosList.data.forEach((photo) => {
		const list = photosByGallery.get(photo.gallery_id) ?? []
		list.push(photo)
		photosByGallery.set(photo.gallery_id, list)
	})

	const selectionsByGallery = new Map<string, PhotoSelection[]>()
	selectionsList.data.forEach((selection) => {
		const list = selectionsByGallery.get(selection.gallery_id) ?? []
		list.push(selection)
		selectionsByGallery.set(selection.gallery_id, list)
	})

	return galleries.map((gallery) => {
		const photos = photosByGallery.get(gallery.id) ?? []
		const selections = selectionsByGallery.get(gallery.id) ?? []

		return {
			...gallery,
			photoCount: photos.length,
			selectedCodes: selections.map((selection) => selection.image_code),
			photos: photos.map((photo) => ({
				...photo,
				public_url: resolvePhotoPublicUrl(photo.storage_path),
			})),
		}
	})
}

export async function deleteGalleryPhoto({ galleryId, photoId }: { galleryId: string; photoId: string }) {
	const supabase = getSupabaseService()

	const { data, error } = await supabase
		.from<GalleryPhoto>('gallery_photos')
		.select('id, storage_path')
		.eq('id', photoId)
		.eq('gallery_id', galleryId)
		.single()

	if (error || !data) {
		throw new Error(error?.message ?? 'Photo not found')
	}

	const { error: deleteError } = await supabase.storage.from(photosBucket).remove([data.storage_path])
	if (deleteError) {
		throw new Error(deleteError.message)
	}

	const { error: dbDeleteError } = await supabase.from('gallery_photos').delete().eq('id', photoId)
	if (dbDeleteError) {
		throw new Error(dbDeleteError.message)
	}
}

function getImageCodeFromFile(file: File) {
	const baseName = file.name.replace(/\.[^/.]+$/, '').trim()

	if (baseName.length > 0) {
		return baseName
	}

	return `photo-${Date.now()}-${Math.abs(crypto.randomInt(1, 9999))}`
}

function normalizeForStorage(value: string) {
	return value
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^a-zA-Z0-9-_]/g, '-')
		.replace(/-+/g, '-')
		.toLowerCase()
}

export async function uploadGalleryPhoto({
	galleryId,
	file,
	imageCode,
}: {
	galleryId: string
	file: File
	imageCode?: string
}) {
	const supabase = getSupabaseService()
	const derivedCode = imageCode ?? getImageCodeFromFile(file)
	const normalizedStorageCode = normalizeForStorage(derivedCode)
	const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
	const storagePath = `${galleryId}/${normalizedStorageCode}.${extension}`
	const { width, height } = await getImageDimensionsFromFile(file)

	const { error: uploadError } = await supabase.storage.from(photosBucket).upload(storagePath, file, {
		cacheControl: '3600',
		contentType: file.type,
		upsert: true,
	})

	if (uploadError) {
		throw new Error(uploadError.message)
	}

	const { data, error } = await supabase
		.from('gallery_photos')
		.upsert(
			{
				gallery_id: galleryId,
				image_code: derivedCode,
				storage_path: storagePath,
				width,
				height,
			},
			{ onConflict: 'gallery_id,image_code' },
		)
		.select('id,gallery_id,image_code,storage_path,width,height,created_at')
		.single()

	if (error) {
		throw new Error(error.message)
	}

	return {
		...data,
		public_url: resolvePhotoPublicUrl(storagePath),
	}
}

export async function uploadGalleryPhotos({
	galleryId,
	files,
}: {
	galleryId: string
	files: File[]
}) {
	const results = []

	for (const file of files) {
		const photo = await uploadGalleryPhoto({ galleryId, file })
		results.push(photo)
	}

	return results
}

