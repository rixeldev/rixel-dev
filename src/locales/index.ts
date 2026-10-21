import english from "@/locales/en.json"
import spanish from "@/locales/es.json"
import type { AstroGlobal } from "astro"

export const LANG = {
	ENGLISH: "en",
	SPANISH: "es",
} as const

export const SUPPORTED_LOCALES = [LANG.ENGLISH, LANG.SPANISH] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = LANG.ENGLISH

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(?:${SUPPORTED_LOCALES.join("|")})(?=/|$)`)

export const normalizeLocale = (locale?: string): Locale => {
	const normalized = locale?.toLowerCase()
	return SUPPORTED_LOCALES.includes(normalized as Locale) ? (normalized as Locale) : DEFAULT_LOCALE
}

export const getI18N = ({ currentLocale }: { currentLocale?: string }) => {
	const locale = normalizeLocale(currentLocale)
	if (locale === LANG.SPANISH) return { ...english, ...spanish }
	return english
}

export const getLanguageLabel = (
	langCode: string | undefined,
	i18n: ReturnType<typeof getI18N>
) => {
	const locale = normalizeLocale(langCode)
	return locale === LANG.SPANISH ? i18n.SPANISH : i18n.ENGLISH
}

type CookieSetParams = Parameters<AstroGlobal["cookies"]["set"]>
type AstroCookies = {
	get: AstroGlobal["cookies"]["get"]
	set?: (...args: CookieSetParams) => ReturnType<AstroGlobal["cookies"]["set"]>
}

type AstroLikeContext = {
	currentLocale?: string
	cookies?: AstroCookies
	request?: Request
	isPrerendered?: boolean
}

const isPrerenderedContext = (context: AstroLikeContext): boolean => {
	if (context.isPrerendered) return true
	if (!context.request) return true

	const desc = Object.getOwnPropertyDescriptor(context.request, "headers")
	if (desc && typeof desc.get === "function") return true

	return false
}

const getPreferredLocaleFromHeader = (headerValue?: string): Locale | undefined => {
	if (!headerValue) return undefined

	const languageTags = headerValue
		.split(",")
		.map((entry) => {
			const [tag, qValue] = entry.trim().split(";q=")
			const quality = qValue ? parseFloat(qValue) : 1
			return { tag: tag.toLowerCase(), quality: Number.isFinite(quality) ? quality : 0 }
		})
		.filter((entry) => entry.tag.length > 0)
		.sort((a, b) => b.quality - a.quality)

	for (const { tag } of languageTags) {
		const baseTag = tag.split("-")[0] as Locale
		if (SUPPORTED_LOCALES.includes(baseTag)) {
			return baseTag
		}
	}

	return undefined
}

export const getActiveLocale = (context: AstroLikeContext): Locale => {
	if (isPrerenderedContext(context)) {
		return normalizeLocale(context.currentLocale)
	}

	const cookieLocale = context.cookies?.get?.("lang")?.value
	if (cookieLocale) {
		return normalizeLocale(cookieLocale)
	}

	const preferredLocale = getPreferredLocaleFromHeader(
		context.request?.headers.get("accept-language") ?? undefined
	)
	const resolvedLocale = normalizeLocale(preferredLocale ?? context.currentLocale)

	if (context.cookies?.set) {
		const oneYearFromNow = new Date()
		oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)

		const cookieOptions = {
			path: "/",
			expires: oneYearFromNow,
			sameSite: "lax" as const,
		} as Parameters<NonNullable<AstroCookies["set"]>>[2]

		context.cookies.set("lang", resolvedLocale, cookieOptions)
	}

	return resolvedLocale
}

export const stripLocaleFromPath = (path: string): string => {
	if (!path) return "/"

	const sanitizedPath = path.startsWith("/") ? path : `/${path}`
	const withoutLocale = sanitizedPath.replace(LOCALE_PREFIX_PATTERN, "") || "/"
	return withoutLocale === "" ? "/" : withoutLocale
}

export const resolveLocalizedPath = (path: string, _targetLocale?: string): string => {
	if (!path) return "/"
	if (path.startsWith("#")) return path

	const sanitizedPath = path.startsWith("/") ? path : `/${path}`
	return stripLocaleFromPath(sanitizedPath)
}

const isExternalHref = (href: string): boolean => {
	return (
		/^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(href) ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:")
	)
}

export const resolveLocalizedHref = (href: string, targetLocale?: string): string => {
	if (!href) return href
	if (isExternalHref(href)) return href
	if (href.startsWith("#")) return href

	const [pathAndQuery, hash] = href.split("#")
	const [pathPart, query] = pathAndQuery.split("?")

	const localizedPath = resolveLocalizedPath(pathPart || "/", targetLocale)
	const querySuffix = query ? `?${query}` : ""
	const hashSuffix = hash ? `#${hash}` : ""

	return `${localizedPath}${querySuffix}${hashSuffix}`
}
