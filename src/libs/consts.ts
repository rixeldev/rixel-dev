import Chat from "@/icons/Chat.astro"
import Discord from "@/icons/Discord.astro"
import GitHub from "@/icons/GitHub.astro"
import Instagram from "@/icons/Instagram.astro"
import Binoculars from "@/icons/Binoculars.astro"
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
		},
		{
			href: "https://instagram.com/rixel.dev",
			icon: Instagram,
		},
		{
			href: "https://discord.gg/VDk8tprcH2",
			icon: Discord,
		},
		{
			href: "https://whatsapp.com/channel/0029Va8erNPAojYouLjOuG0Y",
			icon: WhatsApp,
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
			title: i18n.PHOTOGRAPHY,
			label: "photography",
			href: "/photography",
			icon: Photography,
		},
		{
			title: i18n.MY_PHOTOS,
			label: "gallery",
			href: "/gallery",
			icon: Binoculars,
		},
		{
			title: i18n.PORTFOLIO,
			label: "about",
			href: "/portfolio#about",
			icon: Timeline,
		},
		{
			title: i18n.CONTACT,
			label: "contact",
			href: "#contact",
			icon: Chat,
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
