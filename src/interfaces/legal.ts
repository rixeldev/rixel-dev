export type LegalDocumentId = "privacy" | "terms"

export type LegalCalloutTone = "accent" | "warning"

/** Bilingual text authored next to its translation, resolved at request time. */
export interface LocalizedText {
	en: string
	es: string
}

export type LegalBlockCopy =
	| { kind: "paragraph"; text: LocalizedText }
	| { kind: "list"; items: LocalizedText[]; ordered?: boolean }
	| {
			kind: "callout"
			tone?: LegalCalloutTone
			title?: LocalizedText
			text?: LocalizedText
			items?: LocalizedText[]
	  }
	| { kind: "table"; head: LocalizedText[]; rows: LocalizedText[][] }

export interface LegalSectionCopy {
	id: string
	title: LocalizedText
	blocks: LegalBlockCopy[]
}

export interface LegalDocumentCopy {
	id: LegalDocumentId
	title: LocalizedText
	description: LocalizedText
	updated: LocalizedText
	effective: LocalizedText
	intro: LocalizedText[]
	summary: LocalizedText[]
	sections: LegalSectionCopy[]
}

export type LegalBlock =
	| { kind: "paragraph"; text: string }
	| { kind: "list"; items: string[]; ordered?: boolean }
	| { kind: "callout"; tone: LegalCalloutTone; title?: string; text?: string; items?: string[] }
	| { kind: "table"; head: string[]; rows: string[][] }

export interface LegalSection {
	id: string
	title: string
	blocks: LegalBlock[]
}

export interface LegalDocument {
	id: LegalDocumentId
	title: string
	description: string
	updated: string
	effective: string
	intro: string[]
	summary: string[]
	sections: LegalSection[]
}
