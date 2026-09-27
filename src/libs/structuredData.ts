export const SITE_URL = "https://rixel.dev"

export const PERSON_SAME_AS = [
	"https://github.com/rixeldev",
	"https://www.linkedin.com/in/rixeldev",
	"https://x.com/rixel_dev",
	"https://instagram.com/rixel.dev",
]

export const buildProfileJsonLd = () => ({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": `${SITE_URL}/#person`,
			name: "Rikelvi Capellán García",
			alternateName: "RixelDev",
			url: SITE_URL,
			image: `${SITE_URL}/images/main-pic.webp`,
			jobTitle: "Web & Android Developer",
			knowsAbout: [
				"Web Development",
				"Astro",
				"TypeScript",
				"React",
				"Android",
				"Kotlin",
				"UX/UI",
				"Photography",
			],
			sameAs: PERSON_SAME_AS,
		},
		{
			"@type": "WebSite",
			"@id": `${SITE_URL}/#website`,
			url: SITE_URL,
			name: "Rixel",
			description:
				"Portfolio and blog of Rikelvi Capellán (RixelDev), a web and Android developer from the Dominican Republic.",
			inLanguage: ["en", "es"],
			publisher: { "@id": `${SITE_URL}/#person` },
		},
	],
})
