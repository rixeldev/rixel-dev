import { defineCollection, z } from "astro:content"

const articles = defineCollection({
	schema: z.object({
		author: z.string(),
		category: z.string(),
		cover: z.string(),
		description: z.string(),
		lang: z.string(),
		pageTitle: z.string(),
		tags: z.array(z.string()),
		timestamp: z.string(),
		title: z.string(),
		translationKey: z.string().optional(),
		featured: z.boolean().optional(),
	}),
})

export const collections = { articles }
