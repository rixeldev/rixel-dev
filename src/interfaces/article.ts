export interface Article {
	author: string
	category: string
	cover: string
	description: string
	lang: string
	pageTitle: string
	tags: string[]
	timestamp: string
	title: string
	translationKey?: string
	featured?: boolean
}
