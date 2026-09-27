import { formatArticleIsoDate, sortArticlesByDate } from "@/libs/articlesSeo"
import { getCollection } from "astro:content"
import type { APIRoute } from "astro"

const SITE_URL = "https://rixel.dev"

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;")

export const prerender = true

export const GET: APIRoute = async () => {
	const articles = sortArticlesByDate(await getCollection("articles"))
	const lastBuildDate = articles[0]
		? new Date(formatArticleIsoDate(articles[0].data.timestamp)).toUTCString()
		: new Date().toUTCString()

	const items = articles
		.map((article) => {
			const { category, description, lang, pageTitle, title } = article.data
			const url = `${SITE_URL}/articles/${pageTitle}/`

			return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${new Date(formatArticleIsoDate(article.data.timestamp)).toUTCString()}</pubDate>
      <category>${escapeXml(category)}</category>
      <language>${escapeXml(lang)}</language>
    </item>`
		})
		.join("\n")

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rixel · Articles</title>
    <link>${SITE_URL}/articles/</link>
    <description>Articles and stories about web development, mobile apps, and technology by Rikelvi Capellán (RixelDev).</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

	return new Response(feed, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	})
}
