import { formatArticleIsoDate } from "@/libs/articlesSeo"
import { resolveLocalizedPath } from "@/locales/index"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

const SITE_URL = "https://rixel.dev"

const STATIC_PATHS = [
	"/",
	"/apps/",
	"/apps/stop-trivia/",
	"/apps/setuno/",
	"/articles/",
	"/portfolio/",
	"/photography/",
	"/gallery/",
	"/privacy/",
	"/terms/",
]

export const GET: APIRoute = async () => {
	const articles = await getCollection("articles")
	const urls = [
		...STATIC_PATHS.map((path) => ({
			loc: `${SITE_URL}${resolveLocalizedPath(path)}`,
			lastmod: new Date().toISOString().split("T")[0],
			changefreq: path === "/" ? "weekly" : "monthly",
			priority: path === "/" ? "1.0" : "0.8",
		})),
		...articles.map((article) => ({
			loc: `${SITE_URL}${resolveLocalizedPath(`/articles/${article.data.pageTitle}/`)}`,
			lastmod: formatArticleIsoDate(article.data.timestamp),
			changefreq: "monthly",
			priority: "0.7",
		})),
	]

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
	)
	.join("\n")}
</urlset>`

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	})
}
