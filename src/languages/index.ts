import english from '@/languages/en.json'
import spanish from '@/languages/es.json'

export const LANG = {
	ENGLISH: 'en',
	SPANISH: 'es',
} as const

export const SUPPORTED_LOCALES = [LANG.ENGLISH, LANG.SPANISH] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = LANG.ENGLISH

const LOCALE_PREFIX_PATTERN = new RegExp(`^/(?:${SUPPORTED_LOCALES.join('|')})(?=/|$)`)

export const normalizeLocale = (locale?: string): Locale => {
	const normalized = locale?.toLowerCase()
	return SUPPORTED_LOCALES.includes(normalized as Locale) ? (normalized as Locale) : DEFAULT_LOCALE
}

export const getI18N = ({ currentLocale }: { currentLocale?: string }) => {
	const locale = normalizeLocale(currentLocale)
	if (locale === LANG.SPANISH) return { ...english, ...spanish }
	return english
}

type AstroCookies = {
	get: (name: string) => { value: string } | undefined
}

type AstroLikeContext = {
	currentLocale?: string
	cookies?: AstroCookies
}

export const getActiveLocale = (context: AstroLikeContext): Locale => {
	const cookieLocale = context.cookies?.get?.('lang')?.value
	return normalizeLocale(cookieLocale ?? context.currentLocale)
}

export const stripLocaleFromPath = (path: string): string => {
	if (!path) return '/'

	const sanitizedPath = path.startsWith('/') ? path : `/${path}`
	const withoutLocale = sanitizedPath.replace(LOCALE_PREFIX_PATTERN, '') || '/'
	return withoutLocale === '' ? '/' : withoutLocale
}

export const resolveLocalizedPath = (path: string, _targetLocale?: string): string => {
	if (!path) return '/'
	if (path.startsWith('#')) return path

	const sanitizedPath = path.startsWith('/') ? path : `/${path}`
	return stripLocaleFromPath(sanitizedPath)
}

const isExternalHref = (href: string): boolean => {
	return /^(?:[a-z][a-z\d+\-.]*:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
}

export const resolveLocalizedHref = (href: string, targetLocale?: string): string => {
	if (!href) return href
	if (isExternalHref(href)) return href
	if (href.startsWith('#')) return href

	const [pathAndQuery, hash] = href.split('#')
	const [pathPart, query] = pathAndQuery.split('?')

	const localizedPath = resolveLocalizedPath(pathPart || '/', targetLocale)
	const querySuffix = query ? `?${query}` : ''
	const hashSuffix = hash ? `#${hash}` : ''

	return `${localizedPath}${querySuffix}${hashSuffix}`
}
