export const SITE_URL = "https://rixel.dev"

export const PERSON_SAME_AS = [
	"https://github.com/rixeldev",
	"https://www.linkedin.com/in/rixeldev",
	"https://x.com/rixel_dev",
	"https://instagram.com/rixel.dev",
]

interface MobileApplicationInput {
	name: string
	description: string
	url: string
	icon: string
	screenshots: string[]
	operatingSystem: string
	applicationCategory: string
	inLanguage: string[]
	version: string
	playUrl: string
	webUrl?: string
	tagline?: string
	highlights?: string[]
	stack?: string[]
	price?: string
}

export const buildMobileApplicationJsonLd = ({
	name,
	description,
	url,
	icon,
	screenshots,
	operatingSystem,
	applicationCategory,
	inLanguage,
	version,
	playUrl,
	webUrl,
	tagline,
	highlights = [],
	stack = [],
	price,
}: MobileApplicationInput) => ({
	"@context": "https://schema.org",
	"@type": "MobileApplication",
	"@id": `${url}#app`,
	name,
	description,
	url,
	"image": icon,
	"screenshot": screenshots,
	operatingSystem,
	applicationCategory,
	"applicationSubCategory": "Android app",
	inLanguage,
	"softwareVersion": version,
	"installUrl": playUrl,
	"sameAs": webUrl ? [playUrl, webUrl] : playUrl,
	"downloadUrl": playUrl,
	"softwareRequirements": "Android 7.0 or later",
	"isAccessibleForFree": price === undefined || price.toLowerCase() === "free",
	...(tagline ? { slogan: tagline } : {}),
	...(highlights.length > 0 ? { featureList: highlights } : {}),
	...(stack.length > 0 ? { programmingLanguage: stack } : {}),
	"offers": {
		"@type": "Offer",
		"price": "0",
		"priceCurrency": "USD",
		"availability": "https://schema.org/InStock",
	},
	"author": { "@id": `${SITE_URL}/#person` },
	"publisher": { "@id": `${SITE_URL}/#person` },
})

interface AppsIndexInput {
	name: string
	description: string
	url: string
	apps: Array<{
		name: string
		url: string
		description: string
		icon: string
		tagline?: string
		playUrl?: string
	}>
}

export const buildAppsIndexJsonLd = ({ name, description, url, apps }: AppsIndexInput) => ({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "CollectionPage",
			"@id": `${url}#apps`,
			name,
			description,
			url,
			"inLanguage": ["en", "es"],
			"isPartOf": { "@id": `${SITE_URL}/#website` },
			"breadcrumb": { "@id": `${url}#breadcrumb` },
			"mainEntity": {
				"@type": "ItemList",
				"numberOfItems": apps.length,
				"itemListElement": apps.map((app, index) => ({
					"@type": "ListItem",
					"position": index + 1,
					"item": {
						"@type": "MobileApplication",
						"name": app.name,
						"description": app.description,
						"url": app.url,
						"image": app.icon,
						"operatingSystem": "Android",
						"applicationCategory": "MobileApplication",
						"author": { "@id": `${SITE_URL}/#person` },
						...(app.playUrl ? { installUrl: app.playUrl } : {}),
					},
				})),
			},
		},
		{
			"@type": "BreadcrumbList",
			"@id": `${url}#breadcrumb`,
			"itemListElement": [
				{ "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
				{ "@type": "ListItem", "position": 2, "name": "Apps", "item": url },
			],
		},
	],
})

export const buildProfileJsonLd = () => ({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			"name": "Rikelvi Capellán García",
			"alternateName": "RixelDev",
			"url": SITE_URL,
			"image": `${SITE_URL}/images/main-pic.webp`,
			"jobTitle": "Web & Android Developer",
			"knowsAbout": [
				"Web Development",
				"Astro",
				"TypeScript",
				"React",
				"Android",
				"Kotlin",
				"UX/UI",
				"Photography",
			],
			"sameAs": PERSON_SAME_AS,
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			"url": SITE_URL,
			"name": "Rixel",
			"description":
				"Portfolio and blog of Rikelvi Capellán (RixelDev), a web and Android developer from the Dominican Republic.",
			"inLanguage": ["en", "es"],
			"publisher": { "@id": `${SITE_URL}/#person` },
			"potentialAction": {
				"@type": "SearchAction",
				"target": {
					"@type": "EntryPoint",
					"urlTemplate": `${SITE_URL}/articles/?q={search_term_string}`,
				},
				"query-input": "required name=search_term_string",
			},
		},
	],
})
