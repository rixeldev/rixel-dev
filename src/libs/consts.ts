import Android from "@/icons/Android.astro"
import Book from "@/icons/Book.astro"
import Discord from "@/icons/Discord.astro"
import GitHub from "@/icons/GitHub.astro"
import Instagram from "@/icons/Instagram.astro"
import Photography from "@/icons/Photography.astro"
import Timeline from "@/icons/Timeline.astro"
import WhatsApp from "@/icons/WhatsApp.astro"
import WWW from "@/icons/WWW.astro"
import type { FooterLink } from "@/interfaces/footerLink"
import type { Header } from "@/interfaces/header"
import { getI18N, normalizeLocale } from "@/locales/index"

export const footerLinks = (): FooterLink[] => {
	return [
		{
			href: "https://github.com/rixeldev",
			icon: GitHub,
			label: "GitHub",
		},
		{
			href: "https://instagram.com/rixel.dev",
			icon: Instagram,
			label: "Instagram",
		},
		{
			href: "https://discord.gg/VDk8tprcH2",
			icon: Discord,
			label: "Discord",
		},
		{
			href: "https://whatsapp.com/channel/0029Va8erNPAojYouLjOuG0Y",
			icon: WhatsApp,
			label: "WhatsApp",
		},
	]
}

export const navItems = (currentLocale?: string): Header[] => {
	const locale = normalizeLocale(currentLocale)
	const i18n = getI18N({ currentLocale: locale })

	const baseItems: Array<{ href: string; label: string; title: string; icon: any }> = [
		{
			title: i18n.HOME,
			label: "web",
			href: "/",
			icon: WWW,
		},
		{
			title: i18n.APPS,
			label: "apps",
			href: "/apps",
			icon: Android,
		},
		{
			title: i18n.PORTFOLIO,
			label: "portfolio",
			href: "/portfolio",
			icon: Timeline,
		},
		{
			title: i18n.ARTICLES,
			label: "articles",
			href: "/articles",
			icon: Book,
		},
		{
			title: i18n.PHOTOGRAPHY,
			label: "photography",
			href: "/photography",
			icon: Photography,
		},
	]

	return baseItems.map((item) => ({
		title: item.title,
		label: item.label,
		icon: item.icon,
		url: item.href,
		basePath: item.href.startsWith("/") ? item.href.split("#")[0] : undefined,
	}))
}

export const footerNavItems = (currentLocale?: string) => {
	const locale = normalizeLocale(currentLocale)
	const i18n = getI18N({ currentLocale: locale })

	return [
		{
			title: i18n.FOOTER_GROUP_SITE,
			links: [
				{ label: i18n.HOME, href: "/" },
				{ label: i18n.APPS, href: "/apps" },
				{ label: i18n.PORTFOLIO, href: "/portfolio" },
				{ label: i18n.ARTICLES, href: "/articles" },
				{ label: i18n.PHOTOGRAPHY, href: "/photography" },
			],
		},
		{
			title: i18n.FOOTER_GROUP_CLIENTS,
			links: [
				{ label: i18n.GALLERY, href: "/gallery" },
				{ label: i18n.CONTACT, href: "/#contact" },
			],
		},
		{
			title: i18n.FOOTER_GROUP_LEGAL,
			links: [
				{ label: i18n.PRIVACY, href: "/privacy" },
				{ label: i18n.TERMS, href: "/terms" },
				{ label: i18n.LEGAL_DELETE_DATA, href: "/privacy#account-deletion" },
			],
		},
	]
}
