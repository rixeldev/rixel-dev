import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface AdminSession {
	username: string
}

interface GalleryOverview {
	id: string
	title: string | null
	description: string | null
	event_date: string | null
	created_at: string
	photoCount: number
	selectedCodes: string[]
	photos: Array<{
		id: string
		image_code: string
		public_url: string
		storage_path: string
		width?: number | null
		height?: number | null
	}>
}

interface CreateGalleryForm {
	title: string
	description: string
	eventDate: string
}

interface UploadFormState {
	galleryId: string
	files: File[]
}

export default function AdminDashboard() {
	const [session, setSession] = useState<AdminSession | null>(null)
	const [isCheckingSession, setIsCheckingSession] = useState(true)
	const [authError, setAuthError] = useState<string | null>(null)
	const [loginForm, setLoginForm] = useState({ username: "", password: "" })
	const [isSubmittingLogin, setIsSubmittingLogin] = useState(false)

	const [galleries, setGalleries] = useState<GalleryOverview[]>([])
	const [isLoadingGalleries, setIsLoadingGalleries] = useState(false)
	const [galleryError, setGalleryError] = useState<string | null>(null)

	const [createGalleryForm, setCreateGalleryForm] = useState<CreateGalleryForm>({
		title: "",
		description: "",
		eventDate: "",
	})
	const [isCreatingGallery, setIsCreatingGallery] = useState(false)
	const [createGalleryMessage, setCreateGalleryMessage] = useState<string | null>(null)
	const [createGalleryPin, setCreateGalleryPin] = useState<string | null>(null)

	const [uploadForm, setUploadForm] = useState<UploadFormState>({
		galleryId: "",
		files: [],
	})
	const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
	const [uploadMessage, setUploadMessage] = useState<string | null>(null)
	const uploadInputRef = useRef<HTMLInputElement | null>(null)
	const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null)
	const [deleteDialog, setDeleteDialog] = useState<{
		galleryId: string
		photoId: string
		imageCode: string
	} | null>(null)
	const [viewGallery, setViewGallery] = useState<GalleryOverview | null>(null)
	const [isClient, setIsClient] = useState(false)

	const loadSession = async () => {
		try {
			setIsCheckingSession(true)
			const response = await fetch("/api/admin/session", {
				credentials: "include",
			})
			if (!response.ok) {
				setSession(null)
				return
			}
			const data: AdminSession = await response.json()
			setSession(data)
		} catch (error) {
			console.error("Failed to load session:", error)
			setSession(null)
		} finally {
			setIsCheckingSession(false)
		}
	}

	const loadGalleries = async (): Promise<GalleryOverview[]> => {
		try {
			setIsLoadingGalleries(true)
			const response = await fetch("/api/admin/galleries", {
				credentials: "include",
			})
			if (!response.ok) {
				const payload = await response.json().catch(() => ({}))
				setGalleryError(payload.message ?? "Unable to load galleries.")
				return []
			}
			const payload: { data: GalleryOverview[] } = await response.json()
			const data = payload.data ?? []
			setGalleries(data)
			if (!uploadForm.galleryId && data.length > 0) {
				setUploadForm((prev) => ({
					...prev,
					galleryId: data[0].id,
				}))
			}
			return data
		} catch (error) {
			console.error("Failed to load galleries:", error)
			setGalleryError("Unexpected error loading galleries.")
			return []
		} finally {
			setIsLoadingGalleries(false)
		}
	}

	useEffect(() => {
		loadSession()
	}, [])

	useEffect(() => {
		if (session) {
			loadGalleries()
		}
	}, [session])

	const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setAuthError(null)

		if (!loginForm.username || !loginForm.password) {
			setAuthError("Username and password are required.")
			return
		}

		try {
			setIsSubmittingLogin(true)
			const response = await fetch("/api/admin/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(loginForm),
				credentials: "include",
			})

			if (!response.ok) {
				const payload = await response.json().catch(() => ({}))
				setAuthError(payload.message ?? "Login failed. Check your credentials.")
				return
			}

			const data: AdminSession = await response.json()
			setSession(data)
			setLoginForm({ username: "", password: "" })
			setAuthError(null)
		} catch (error) {
			console.error("Login failed:", error)
			setAuthError("Unexpected error during login. Try again.")
		} finally {
			setIsSubmittingLogin(false)
		}
	}

	const handleLogout = async () => {
		try {
			await fetch("/api/admin/logout", {
				method: "POST",
				credentials: "include",
			})
		} catch (error) {
			console.error("Logout failed:", error)
		} finally {
			setSession(null)
			setGalleries([])
		}
	}

	const handleCreateGallery = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setCreateGalleryMessage(null)

		setCreateGalleryPin(null)

		if (!createGalleryForm.title) {
			setCreateGalleryMessage("Title is required.")
			return
		}

		try {
			setIsCreatingGallery(true)
			const response = await fetch("/api/admin/galleries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(createGalleryForm),
				credentials: "include",
			})

			if (!response.ok) {
				const payload = await response.json().catch(() => ({}))
				setCreateGalleryMessage(payload.message ?? "Failed to create gallery.")
				return
			}

			const payload: { pin: string } = await response.json()
			setCreateGalleryMessage("Gallery created successfully.")
			setCreateGalleryPin(payload.pin)
			setCreateGalleryForm({
				title: "",
				description: "",
				eventDate: "",
			})

			await loadGalleries()
		} catch (error) {
			console.error("Create gallery failed:", error)
			setCreateGalleryMessage("Unexpected error while creating gallery.")
		} finally {
			setIsCreatingGallery(false)
		}
	}

	const handleUploadPhoto = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setUploadMessage(null)

		if (!uploadForm.galleryId || uploadForm.files.length === 0) {
			setUploadMessage("Select a gallery and choose at least one file to upload.")
			return
		}

		try {
			setIsUploadingPhoto(true)
			const formData = new FormData()
			uploadForm.files.forEach((file) => formData.append("files", file))

			const response = await fetch(`/api/admin/galleries/${uploadForm.galleryId}/photos`, {
				method: "POST",
				body: formData,
				credentials: "include",
			})

			if (!response.ok) {
				const payload = await response.json().catch(() => ({}))
				setUploadMessage(payload.message ?? "Failed to upload photo.")
				return
			}

			const payload: { photos: GalleryOverview["photos"] } = await response.json()
			const uploadedCount = payload.photos?.length ?? uploadForm.files.length
			setUploadMessage(
				uploadedCount > 1
					? `Uploaded ${uploadedCount} photos successfully. Image codes match the filenames.`
					: "Photo uploaded successfully. Image code matches the filename."
			)
			setUploadForm((prev) => ({
				...prev,
				files: [],
			}))
			if (uploadInputRef.current) {
				uploadInputRef.current.value = ""
			}

			await loadGalleries()
		} catch (error) {
			console.error("Upload photo failed:", error)
			setUploadMessage("Unexpected error while uploading photo.")
		} finally {
			setIsUploadingPhoto(false)
		}
	}

	const handleDeletePhoto = async (galleryId: string, photoId: string) => {
		try {
			setDeletingPhotoId(photoId)
			const response = await fetch(`/api/admin/galleries/${galleryId}/photos/${photoId}`, {
				method: "DELETE",
				credentials: "include",
			})

			if (!response.ok) {
				const payload = await response.json().catch(() => ({}))
				setGalleryError(payload.message ?? "Failed to delete photo.")
				return
			}

			const updated = await loadGalleries()
			setViewGallery((current) => {
				if (!current) return null
				const next = updated.find((gallery) => gallery.id === current.id)
				return next ?? null
			})
			setDeleteDialog(null)
		} catch (error) {
			console.error("Delete photo failed:", error)
			setGalleryError("Unexpected error while deleting photo.")
		} finally {
			setDeletingPhotoId(null)
		}
	}

	useEffect(() => {
		setIsClient(true)
	}, [])

	const viewGalleryModal =
		isClient && viewGallery
			? createPortal(
					<div className="fixed inset-0 z-[1500] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur">
						<div className="flex h-full max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
							<header className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8 dark:border-slate-800">
								<div>
									<p className="text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
										Gallery
									</p>
									<h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
										{viewGallery.title ?? "Untitled gallery"}
									</h2>
									<div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
										<span>Created {new Date(viewGallery.created_at).toLocaleDateString()}</span>
										{viewGallery.event_date ? (
											<span>Event {new Date(viewGallery.event_date).toLocaleDateString()}</span>
										) : null}
									</div>
								</div>
								<div className="flex items-center gap-3">
									<span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200">
										{viewGallery.photoCount} photos
									</span>
									<button
										type="button"
										onClick={() => setViewGallery(null)}
										className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold text-slate-600 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-main/40 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
									>
										<span className="sr-only">Close viewer</span>&times;
									</button>
								</div>
							</header>
							<div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 md:px-8">
								{viewGallery.photos.length === 0 ? (
									<div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
										<p className="text-sm font-medium">No photos uploaded yet.</p>
										<p className="text-xs text-slate-400 dark:text-slate-500">
											Upload new images using the form on the dashboard.
										</p>
									</div>
								) : (
									<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
										{viewGallery.photos.map((photo) => {
											const isSelected = viewGallery.selectedCodes.includes(photo.image_code)
											const hasDimensions = Boolean(photo.width && photo.height)
											const aspectStyle = hasDimensions
												? { aspectRatio: `${photo.width}/${photo.height}` }
												: undefined
											return (
												<div
													key={photo.id}
													className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
												>
													<div
														className={`relative w-full overflow-hidden bg-slate-100 dark:bg-slate-950 ${
															hasDimensions ? "" : "h-52"
														}`}
														style={aspectStyle}
													>
														<img
															src={photo.public_url}
															alt={photo.image_code}
															className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
															style={hasDimensions ? { width: "100%", height: "100%" } : undefined}
														/>
														{isSelected ? (
															<span className="absolute left-4 top-4 rounded-full bg-main px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow shadow-main/40">
																Selected
															</span>
														) : null}
														<button
															type="button"
															onClick={() =>
																setDeleteDialog({
																	galleryId: viewGallery.id,
																	photoId: photo.id,
																	imageCode: photo.image_code,
																})
															}
															disabled={deletingPhotoId === photo.id}
															className="absolute right-4 top-4 inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white opacity-0 transition disabled:opacity-60 group-hover:opacity-100"
														>
															{deletingPhotoId === photo.id ? "Removing…" : "Delete"}
														</button>
													</div>
													<div className="flex flex-col gap-2 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
														<div className="flex items-center justify-between gap-2">
															<span className="truncate">{photo.image_code}</span>
															{isSelected ? (
																<span className="text-xs text-main dark:text-main/80">
																	Client pick
																</span>
															) : null}
														</div>
														{hasDimensions ? (
															<span className="text-xs font-normal text-slate-500 dark:text-slate-400">
																{photo.width} × {photo.height}px
															</span>
														) : null}
													</div>
												</div>
											)
										})}
									</div>
								)}

								<div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
									<p className="font-semibold text-slate-700 dark:text-slate-200">Selected codes</p>
									{viewGallery.selectedCodes.length === 0 ? (
										<p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
											No selections yet.
										</p>
									) : (
										<div className="mt-2 flex flex-wrap gap-2">
											{viewGallery.selectedCodes.map((code) => (
												<span
													key={code}
													className="inline-flex items-center rounded-full bg-main/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-main dark:bg-main/20 dark:text-main/90"
												>
													{code}
												</span>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>,
					document.body
				)
			: null

	if (isCheckingSession) {
		return (
			<section className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl bg-white/80 p-12 text-center shadow-xl dark:bg-slate-900/80">
				<div className="h-12 w-12 animate-spin rounded-full border-4 border-main border-t-transparent" />
				<p className="text-sm font-semibold text-slate-600 dark:text-slate-200">
					Loading dashboard...
				</p>
			</section>
		)
	}

	if (!session) {
		return (
			<section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 p-10 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
				<h1 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
					Admin Dashboard
				</h1>
				<p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
					Sign in with your administrator credentials.
				</p>

				<form className="mt-8 space-y-5" onSubmit={handleLoginSubmit}>
					<div className="space-y-2">
						<label
							className="text-sm font-semibold text-slate-700 dark:text-slate-200"
							htmlFor="username"
						>
							Username
						</label>
						<input
							id="username"
							name="username"
							type="text"
							value={loginForm.username}
							onChange={(event) =>
								setLoginForm((prev) => ({ ...prev, username: event.target.value }))
							}
							className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
							autoComplete="username"
						/>
					</div>
					<div className="space-y-2">
						<label
							className="text-sm font-semibold text-slate-700 dark:text-slate-200"
							htmlFor="password"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							value={loginForm.password}
							onChange={(event) =>
								setLoginForm((prev) => ({ ...prev, password: event.target.value }))
							}
							className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
							autoComplete="current-password"
						/>
					</div>

					{authError ? <p className="text-sm text-red-500">{authError}</p> : null}

					<button
						type="submit"
						disabled={isSubmittingLogin}
						className="w-full rounded-lg bg-main px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main/40 disabled:cursor-not-allowed disabled:bg-slate-400"
					>
						{isSubmittingLogin ? "Signing in..." : "Sign in"}
					</button>
				</form>
			</section>
		)
	}

	return (
		<>
			<section className="mx-auto flex w-full max-w-7xl flex-col gap-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-2xl backdrop-blur md:p-14 dark:border-slate-800 dark:bg-slate-900/80">
				<header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
							Welcome back,
						</p>
						<h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-main hover:text-main focus:outline-none focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:text-slate-200"
					>
						Log out
					</button>
				</header>

				<section className="grid gap-6 lg:grid-cols-2">
					<div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md dark:border-slate-800 dark:bg-slate-900/80">
						<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
							Create a new gallery
						</h2>
						<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
							Define a gallery and we'll generate a unique PIN you can share with your client.
						</p>

						<form className="mt-6 space-y-4" onSubmit={handleCreateGallery}>
							<div>
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
									Title
								</label>
								<input
									type="text"
									value={createGalleryForm.title}
									onChange={(event) =>
										setCreateGalleryForm((prev) => ({ ...prev, title: event.target.value }))
									}
									className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
									placeholder="Birthday session – Maria"
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
									Description
								</label>
								<textarea
									value={createGalleryForm.description}
									onChange={(event) =>
										setCreateGalleryForm((prev) => ({ ...prev, description: event.target.value }))
									}
									className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
									rows={3}
									placeholder="Short note for the gallery (optional)"
								/>
							</div>
							<div>
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
									Event date
								</label>
								<input
									type="date"
									value={createGalleryForm.eventDate}
									onChange={(event) =>
										setCreateGalleryForm((prev) => ({ ...prev, eventDate: event.target.value }))
									}
									className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
								/>
							</div>

							{createGalleryMessage ? (
								<p className="text-sm text-main dark:text-main/80">{createGalleryMessage}</p>
							) : null}
							{createGalleryPin ? (
								<div className="rounded-xl border border-dashed border-main/40 bg-main/5 p-4 text-sm font-semibold text-main dark:border-main/60 dark:bg-main/20 dark:text-main/90">
									Generated PIN: <span className="font-mono text-base">{createGalleryPin}</span>
								</div>
							) : null}

							<button
								type="submit"
								disabled={isCreatingGallery}
								className="w-full rounded-lg bg-main px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main/40 disabled:cursor-not-allowed disabled:bg-slate-400"
							>
								{isCreatingGallery ? "Creating..." : "Create gallery"}
							</button>
						</form>
					</div>

					<div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md dark:border-slate-800 dark:bg-slate-900/80">
						<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
							Upload photos
						</h2>
						<p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
							Upload one or many photos to a gallery. Each photo uses its filename as the image
							code.
						</p>

						<form className="mt-6 space-y-4" onSubmit={handleUploadPhoto}>
							<div>
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
									Select gallery
								</label>
								<select
									className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
									value={uploadForm.galleryId}
									onChange={(event) =>
										setUploadForm((prev) => ({ ...prev, galleryId: event.target.value }))
									}
								>
									<option value="">Select a gallery</option>
									{galleries.map((gallery) => (
										<option key={gallery.id} value={gallery.id}>
											{gallery.title ?? "Untitled gallery"}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
									Select files
								</label>
								<input
									ref={uploadInputRef}
									type="file"
									multiple
									accept="image/*"
									onChange={(event) => {
										const files = event.target.files ? Array.from(event.target.files) : []
										setUploadForm((prev) => ({
											...prev,
											files,
										}))
									}}
									className="mt-1 w-full rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
								/>
								<p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
									Selected filenames will be stored as the image codes automatically.
								</p>
							</div>

							{uploadMessage ? (
								<p className="text-sm text-main dark:text-main/80">{uploadMessage}</p>
							) : null}

							<button
								type="submit"
								disabled={isUploadingPhoto}
								className="w-full rounded-lg bg-main px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main/40 disabled:cursor-not-allowed disabled:bg-slate-400"
							>
								{isUploadingPhoto ? "Uploading..." : "Upload photos"}
							</button>
						</form>
					</div>
				</section>

				<section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-md dark:border-slate-800 dark:bg-slate-900/80">
					<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<div>
							<h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
								Galleries
							</h2>
							<p className="text-sm text-slate-600 dark:text-slate-300">
								Review galleries, uploaded photos, and client selections.
							</p>
						</div>
						{isLoadingGalleries ? (
							<span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Refreshing...
							</span>
						) : (
							<button
								type="button"
								onClick={loadGalleries}
								className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-main hover:text-main focus:outline-none focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:text-slate-200"
							>
								Refresh
							</button>
						)}
					</div>

					{galleryError ? <p className="mt-4 text-sm text-red-500">{galleryError}</p> : null}

					<div className="mt-6 space-y-6">
						{galleries.length === 0 ? (
							<div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
								No galleries yet. Create one to get started.
							</div>
						) : (
							galleries.map((gallery) => (
								<article
									key={gallery.id}
									className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow dark:border-slate-800 dark:bg-slate-900/80"
								>
									<header className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
										<div>
											<h3 className="text-xl font-semibold text-slate-900 dark:text-white">
												{gallery.title ?? "Untitled gallery"}
											</h3>
											<p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
												Created on {new Date(gallery.created_at).toLocaleDateString()}
											</p>
											{gallery.event_date ? (
												<p className="text-xs text-slate-500 dark:text-slate-400">
													Event date: {new Date(gallery.event_date).toLocaleDateString()}
												</p>
											) : null}
										</div>
										<div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200">
											{gallery.photoCount} photos
										</div>
									</header>

									{gallery.description ? (
										<p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
											{gallery.description}
										</p>
									) : null}

									<div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/60">
										<div className="flex flex-wrap items-center justify-between gap-3">
											<p className="text-sm text-slate-600 dark:text-slate-300">
												Total photos:{" "}
												<span className="font-semibold text-slate-900 dark:text-slate-100">
													{gallery.photoCount}
												</span>
											</p>
											<button
												type="button"
												onClick={() => setViewGallery(gallery)}
												className="inline-flex items-center gap-2 rounded-full bg-main px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main/40"
											>
												View photos
											</button>
										</div>
										<p className="text-xs text-slate-500 dark:text-slate-400">
											Open the photo viewer to inspect images in detail and remove any shot you no
											longer need.
										</p>
									</div>

									<div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
										<p className="font-semibold text-slate-700 dark:text-slate-200">
											Selected codes
										</p>
										{gallery.selectedCodes.length === 0 ? (
											<p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
												No selections yet.
											</p>
										) : (
											<div className="mt-2 flex flex-wrap gap-2">
												{gallery.selectedCodes.map((code) => (
													<span
														key={code}
														className="inline-flex items-center rounded-full bg-main/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-main dark:bg-main/20 dark:text-main/90"
													>
														{code}
													</span>
												))}
											</div>
										)}
									</div>
								</article>
							))
						)}
					</div>
				</section>
			</section>

			{viewGalleryModal}

			{deleteDialog ? (
				<div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur">
					<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
						<h2 className="text-xl font-semibold">Delete photo</h2>
						<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
							Are you sure you want to delete the photo with code{" "}
							<span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
								{deleteDialog.imageCode}
							</span>
							? This action cannot be undone.
						</p>

						<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
							<button
								type="button"
								disabled={deletingPhotoId === deleteDialog.photoId}
								onClick={() => setDeleteDialog(null)}
								className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-main/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-100"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={() => void handleDeletePhoto(deleteDialog.galleryId, deleteDialog.photoId)}
								disabled={deletingPhotoId === deleteDialog.photoId}
								className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:cursor-not-allowed disabled:bg-red-400"
							>
								{deletingPhotoId === deleteDialog.photoId ? "Deleting…" : "Delete photo"}
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	)
}
