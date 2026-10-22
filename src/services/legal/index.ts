import type {
	LegalBlock,
	LegalBlockCopy,
	LegalDocument,
	LegalDocumentCopy,
	LegalDocumentId,
	LocalizedText,
} from "@/interfaces/legal"
import { normalizeLocale, type Locale } from "@/locales/index"
import { privacyCopy } from "@/services/legal/privacy"
import { termsCopy } from "@/services/legal/terms"

/** Public address used in the legal documents and by the contact form. */
export const LEGAL_CONTACT_EMAIL = "rixeldev0@gmail.com"

const pick = (text: LocalizedText, locale: Locale): string => text[locale]

const fillTokens = (text: string): string => text.replaceAll("{email}", LEGAL_CONTACT_EMAIL)

const resolveBlock = (block: LegalBlockCopy, locale: Locale): LegalBlock => {
	switch (block.kind) {
		case "paragraph":
			return { kind: "paragraph", text: fillTokens(pick(block.text, locale)) }
		case "list":
			return {
				kind: "list",
				ordered: block.ordered ?? false,
				items: block.items.map((item) => fillTokens(pick(item, locale))),
			}
		case "callout":
			return {
				kind: "callout",
				tone: block.tone ?? "accent",
				title: block.title ? fillTokens(pick(block.title, locale)) : undefined,
				text: block.text ? fillTokens(pick(block.text, locale)) : undefined,
				items: block.items?.map((item) => fillTokens(pick(item, locale))),
			}
		case "table":
			return {
				kind: "table",
				head: block.head.map((cell) => fillTokens(pick(cell, locale))),
				rows: block.rows.map((row) => row.map((cell) => fillTokens(pick(cell, locale)))),
			}
	}
}

const resolveDocument = (copy: LegalDocumentCopy, locale: Locale): LegalDocument => ({
	id: copy.id,
	title: pick(copy.title, locale),
	description: pick(copy.description, locale),
	updated: pick(copy.updated, locale),
	effective: pick(copy.effective, locale),
	intro: copy.intro.map((paragraph) => fillTokens(pick(paragraph, locale))),
	summary: copy.summary.map((item) => fillTokens(pick(item, locale))),
	sections: copy.sections.map((section) => ({
		id: section.id,
		title: pick(section.title, locale),
		blocks: section.blocks.map((block) => resolveBlock(block, locale)),
	})),
})

const documents: Record<LegalDocumentId, LegalDocumentCopy> = {
	privacy: privacyCopy,
	terms: termsCopy,
}

export const getLegalDocument = (id: LegalDocumentId, currentLocale?: string): LegalDocument =>
	resolveDocument(documents[id], normalizeLocale(currentLocale))
