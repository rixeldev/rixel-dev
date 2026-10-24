/** Returns the MIME type of an image asset from its file extension. */
export const imageMimeType = (src: string): string => {
	const path = src.split("?")[0].split("#")[0]
	const extension = path.slice(path.lastIndexOf(".") + 1).toLowerCase()

	switch (extension) {
		case "jpg":
		case "jpeg":
			return "image/jpeg"
		case "webp":
			return "image/webp"
		case "avif":
			return "image/avif"
		case "svg":
			return "image/svg+xml"
		default:
			return "image/png"
	}
}

/** Assets served from `public/` can be preloaded by path; remote URLs cannot. */
export const isLocalAsset = (src: string): boolean => src.startsWith("/")
