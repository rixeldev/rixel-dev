import { useCallback, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { getI18N, normalizeLocale } from "@/languages/index"

interface GalleryInfo {
  id: string
  title: string | null
  description: string | null
  eventDate: string | null
}

interface GalleryPhotoResponse {
  id: string
  gallery_id: string
  image_code: string
  storage_path: string
  width?: number | null
  height?: number | null
  public_url: string
}

interface GalleryAccessResponse {
  gallery: {
    id: string
    title: string | null
    description: string | null
    eventDate: string | null
  }
  photos: GalleryPhotoResponse[]
  selectedCodes: string[]
}

interface GalleryAccessProps {
  locale?: string
}

export default function GalleryAccess({ locale = "en" }: GalleryAccessProps) {
  const normalizedLocale = useMemo(() => normalizeLocale(locale), [locale])
  const i18n = useMemo(() => getI18N({ currentLocale: normalizedLocale }), [normalizedLocale])

  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [gallery, setGallery] = useState<GalleryInfo | null>(null)
  const [photos, setPhotos] = useState<GalleryPhotoResponse[]>([])
  const [selectedCodes, setSelectedCodes] = useState<string[]>([])
  const [isSavingSelection, setIsSavingSelection] = useState(false)
  const [selectionMessage, setSelectionMessage] = useState<string | null>(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  const galleryTitle = useMemo(() => {
    if (!gallery) return ""
    return gallery.title ?? i18n.GALLERY_DEFAULT_TITLE
  }, [gallery, i18n])

  const previewPhoto = useMemo(() => {
    if (previewIndex === null) return null
    return photos[previewIndex] ?? null
  }, [photos, previewIndex])

  const handleVerifyPin = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setPinError(null)
      setSelectionMessage(null)

      if (!pin.trim()) {
        setPinError(i18n.GALLERY_PIN_REQUIRED_ERROR)
        return
      }

      try {
        setIsVerifying(true)
        const response = await fetch("/api/gallery/access", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pin, locale: normalizedLocale }),
        })

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          setPinError(payload.message ?? i18n.GALLERY_INCORRECT_PIN_ERROR)
          return
        }

        const payload: GalleryAccessResponse = await response.json()
        setGallery({
          id: payload.gallery.id,
          title: payload.gallery.title,
          description: payload.gallery.description,
          eventDate: payload.gallery.eventDate,
        })
        setPhotos(payload.photos)
        setSelectedCodes(payload.selectedCodes ?? [])
      } catch (error) {
        console.error("PIN verification failed:", error)
        setPinError(i18n.GALLERY_GENERIC_ERROR)
      } finally {
        setIsVerifying(false)
      }
    },
    [pin, i18n, normalizedLocale],
  )

  const toggleSelection = useCallback((imageCode: string) => {
    setSelectedCodes((prev) => {
      const next = new Set(prev)
      if (next.has(imageCode)) {
        next.delete(imageCode)
      } else {
        next.add(imageCode)
      }
      return Array.from(next)
    })
  }, [])

  const handleSaveSelection = useCallback(async () => {
    if (!gallery) return

    setSelectionMessage(null)
    setIsSavingSelection(true)

    try {
      const response = await fetch("/api/gallery/selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin,
          galleryId: gallery.id,
          selectedCodes,
          locale: normalizedLocale,
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        setSelectionMessage(payload.message ?? i18n.GALLERY_SAVE_ERROR)
        return
      }

      setSelectionMessage(i18n.GALLERY_SAVE_SUCCESS)
    } catch (error) {
      console.error("Saving selection failed:", error)
      setSelectionMessage(i18n.GALLERY_SAVE_GENERIC_ERROR)
    } finally {
      setIsSavingSelection(false)
    }
  }, [gallery, i18n, normalizedLocale, pin, selectedCodes])

  const resetGallery = useCallback(() => {
    setGallery(null)
    setPhotos([])
    setSelectedCodes([])
    setSelectionMessage(null)
  }, [])

  const openPreview = useCallback((index: number) => {
    setPreviewIndex(index)
  }, [])

  const closePreview = useCallback(() => {
    setPreviewIndex(null)
  }, [])

  const goToNext = useCallback(() => {
    setPreviewIndex((current) => {
      if (current === null) return null
      if (photos.length === 0) return null
      if (current >= photos.length - 1) return current
      return current + 1
    })
  }, [photos.length])

  const goToPrevious = useCallback(() => {
    setPreviewIndex((current) => {
      if (current === null) return null
      if (photos.length === 0) return null
      if (current <= 0) return current
      return current - 1
    })
  }, [photos.length])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (previewIndex === null) return

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview()
      }
      if (event.key === "ArrowRight" && previewIndex < photos.length - 1) {
        goToNext()
      }
      if (event.key === "ArrowLeft" && previewIndex > 0) {
        goToPrevious()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeydown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeydown)
    }
  }, [previewIndex, closePreview, goToNext, goToPrevious, photos.length])

  useEffect(() => {
    if (photos.length === 0) {
      setPreviewIndex(null)
    }
  }, [photos.length])

  const previewModal =
    isClient && previewPhoto
      ? createPortal(
          <div
            className="fixed inset-0 z-[10000] flex min-h-[100dvh] w-screen flex-col bg-slate-950/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={`${i18n.GALLERY_PREVIEW_ARIA_PREFIX} ${previewPhoto.image_code}`}
            onClick={closePreview}
          >
            <div
              className="relative flex h-full w-full flex-col text-white"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-center justify-between px-5 pb-2 pt-6 md:px-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60">{i18n.GALLERY_PREVIEWING}</p>
                  <p className="mt-1 font-semibold">{previewPhoto.image_code}</p>
                </div>
                <button
                  type="button"
                  onClick={closePreview}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl text-white transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/80"
                >
                  <span className="sr-only">{i18n.GALLERY_CLOSE_PREVIEW}</span>
                  &times;
                </button>
              </header>

              <div className="relative flex-1 overflow-hidden px-5 pb-6 md:px-10">
                <div className="relative flex h-full w-full items-center justify-center rounded-3xl bg-slate-900/80 shadow-inner shadow-slate-900/40">
                  <img
                    src={previewPhoto.public_url}
                    alt={previewPhoto.image_code}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {previewIndex !== null && previewIndex > 0 ? (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950/70 to-transparent" />
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center px-4">
                      <button
                        type="button"
                        onClick={goToPrevious}
                        className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
                      >
                        <span className="sr-only">{i18n.GALLERY_SHOW_PREVIOUS}</span>
                        &#10094;
                      </button>
                    </div>
                  </>
                ) : null}

                {previewIndex !== null && previewIndex < photos.length - 1 ? (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950/70 to-transparent" />
                    <div className="absolute inset-y-0 right-0 flex items-center justify-center px-4">
                      <button
                        type="button"
                        onClick={goToNext}
                        className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
                      >
                        <span className="sr-only">{i18n.GALLERY_SHOW_NEXT}</span>
                        &#10095;
                      </button>
                    </div>
                  </>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 px-5 pb-6 md:flex-row md:items-center md:justify-between md:px-10">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{i18n.GALLERY_IMAGE_CODE}</p>
                  <p className="rounded-lg bg-white/10 px-4 py-2 font-mono text-sm md:text-base">
                    {previewPhoto.image_code}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSelection(previewPhoto.image_code)}
                    className={`inline-flex min-w-[12rem] items-center justify-center rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-white/70 ${
                      selectedCodes.includes(previewPhoto.image_code)
                        ? "bg-main text-white hover:bg-main/90"
                        : "bg-white text-slate-900 hover:bg-white/90"
                    }`}
                  >
                    {selectedCodes.includes(previewPhoto.image_code)
                      ? i18n.GALLERY_REMOVE_SELECTION
                      : i18n.GALLERY_SELECT_PHOTO}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  if (!gallery) {
    return (
      <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <h1 className="text-center text-2xl font-bold text-slate-900 dark:text-slate-50">
          {i18n.GALLERY_ACCESS_TITLE}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
          {i18n.GALLERY_ACCESS_SUBTITLE}
        </p>
        <form className="mt-8 space-y-4" onSubmit={handleVerifyPin}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pin"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              {i18n.GALLERY_PIN_LABEL}
            </label>
            <input
              id="pin"
              name="pin"
              type="text"
              value={pin}
              autoComplete="off"
              onChange={(event) => setPin(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-main focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-50"
              placeholder={i18n.GALLERY_PIN_PLACEHOLDER}
            />
            {pinError ? <p className="text-sm text-red-500">{pinError}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="mt-2 w-full rounded-lg bg-main px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main/40 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isVerifying ? i18n.GALLERY_VERIFYING : i18n.GALLERY_UNLOCK_BUTTON}
          </button>
        </form>
      </section>
    )
  }

  const selectedSummary = i18n.GALLERY_SELECTED_COUNT.replace("{selected}", `${selectedCodes.length}`).replace(
    "{total}",
    `${photos.length}`,
  )

  return (
    <>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-xl backdrop-blur md:p-10 dark:border-slate-800 dark:bg-slate-900/80">
        <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{galleryTitle}</h2>
            {gallery.description ? (
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                {gallery.description}
              </p>
            ) : null}
            {gallery.eventDate ? (
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {i18n.GALLERY_EVENT_DATE_LABEL} {new Date(gallery.eventDate).toLocaleDateString(normalizedLocale)}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={resetGallery}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-main hover:text-main focus:outline-none focus:ring-2 focus:ring-main/40 dark:border-slate-700 dark:text-slate-200"
          >
            {i18n.GALLERY_USE_ANOTHER_PIN}
          </button>
        </header>

        {photos.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-10 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
            <p>{i18n.GALLERY_NO_PHOTOS}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => {
              const isSelected = selectedCodes.includes(photo.image_code)
              const hasDimensions = Boolean(photo.width && photo.height)
              const aspectStyle = hasDimensions
                ? { aspectRatio: `${photo.width}/${photo.height}` }
                : undefined

              return (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => openPreview(index)}
                  className={`group relative overflow-hidden rounded-2xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-main/60 ${
                    isSelected
                      ? "border-main bg-main/10 shadow-lg shadow-main/20"
                      : "border-transparent bg-white/80 shadow-md hover:shadow-lg dark:bg-slate-800/80"
                  }`}
                >
                  <div
                    className={`relative w-full overflow-hidden bg-slate-100 dark:bg-slate-950 ${
                      hasDimensions ? "" : "h-64"
                    }`}
                    style={aspectStyle}
                  >
                    <img
                      src={photo.public_url}
                      alt={photo.image_code}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      style={hasDimensions ? { width: "100%", height: "100%" } : undefined}
                    />
                    <span
                      className={`absolute right-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                        isSelected
                          ? "bg-main text-white shadow shadow-main/50"
                          : "bg-white/80 text-slate-800 shadow"
                      }`}
                    >
                      {isSelected ? i18n.GALLERY_SELECTED_BADGE : i18n.GALLERY_TAP_TO_SELECT}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                    <span className="truncate" title={photo.image_code}>
                      {photo.image_code}
                    </span>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-main focus:ring-main"
                      onChange={() => toggleSelection(photo.image_code)}
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        )}

        <div className="flex flex-col items-start gap-3 rounded-xl bg-slate-100/60 p-4 md:flex-row md:items-center md:justify-between dark:bg-slate-800/60">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{selectedSummary}</p>
            {selectionMessage ? (
              <p className="text-xs text-main dark:text-main/80">{selectionMessage}</p>
            ) : null}
          </div>
          <button
            type="button"
            disabled={isSavingSelection}
            onClick={handleSaveSelection}
            className="inline-flex items-center gap-2 rounded-full bg-main px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main/40 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSavingSelection ? i18n.GALLERY_SAVING : i18n.GALLERY_SAVE_SELECTION}
          </button>
        </div>
      </section>
      {previewModal}
    </>
  )
}
