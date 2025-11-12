export interface Gallery {
	id: string
	title: string | null
	description: string | null
	event_date: string | null
	pin_hash: string
	created_at: string
}

export interface GalleryPhoto {
	id: string
	gallery_id: string
	image_code: string
	storage_path: string
	width?: number | null
	height?: number | null
	created_at: string
}

export interface PhotoSelection {
	id: string
	gallery_id: string
	image_code: string
	selected_at: string
}

export interface GalleryWithPhotos {
	id: string
	title: string | null
	description: string | null
	event_date: string | null
	photos: Array<{
		id: string
		gallery_id: string
		image_code: string
		storage_path: string
		width?: number | null
		height?: number | null
		public_url: string
	}>
	selectedCodes: string[]
}

