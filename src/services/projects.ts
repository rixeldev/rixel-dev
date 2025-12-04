import { type Project } from "@/interfaces/project"
import AstroBrand from "@/icons/AstroBrand.astro"
import Angular from "@/icons/Angular.astro"
import Tailwind from "@/icons/Tailwind.astro"
import Kotlin from "@/icons/Kotlin.astro"
import Firebase from "@/icons/Firebase.astro"
import Android from "@/icons/Android.astro"
import { getI18N } from "@/locales/index"
import NextJS from "@/icons/NextJS.astro"
import Supabase from "@/icons/Supabase.astro"
import ReactNative from "@/icons/ReactNative.astro"

const TAGS = {
	ASTRO: {
		name: "Astro",
		class: "bg-orange-950 text-slate-200",
		iconColor: "text-orange-600",
		icon: AstroBrand,
	},
	ANGULAR: {
		name: "Angular",
		class: "bg-red-950 text-slate-200",
		iconColor: "text-red-600",
		icon: Angular,
	},
	TAILWIND: {
		name: "Tailwind CSS",
		class: "bg-[#003159] text-slate-200",
		iconColor: "text-[#73bcf6]",
		icon: Tailwind,
	},
	KOTLIN: {
		name: "Kotlin",
		class: "bg-indigo-950 text-slate-200",
		iconColor: "text-indigo-600",
		icon: Kotlin,
	},
	FIREBASE: {
		name: "Firebase",
		class: "bg-yellow-950 text-slate-200",
		iconColor: "text-yellow-600",
		icon: Firebase,
	},
	ANDROID: {
		name: "Android",
		class: "bg-green-950 text-slate-200",
		iconColor: "text-green-600",
		icon: Android,
	},
	NEXTJS: {
		name: "NextJS",
		class: "bg-black text-slate-200",
		iconColor: "text-white",
		icon: NextJS,
	},
	SUPABASE: {
		name: "Supabase",
		class: "bg-green-950 text-slate-200",
		iconColor: "text-green-600",
		icon: Supabase,
	},
	REACT_NATIVE: {
		name: "React Native",
		class: "bg-cyan-950 text-slate-200",
		iconColor: "text-cyan-600",
		icon: ReactNative,
	},
}

export const projectsService = (currentLocale?: string): Project[] => {
	const i18n = getI18N({ currentLocale })
	return [
		{
			id: "el-chevere",
			title: "El Chévere - Official Web",
			description: i18n.EL_CHEVERE_WEB_DESCRIPTION,
			imgUrl: "https://rixel.dev/projects/el-chevere.webp",
			projectUrl: "https://fotoestudioelchevere.com/",
			tags: [TAGS.ASTRO, TAGS.TAILWIND, TAGS.SUPABASE],
			gitCodeUrl: "https://github.com/rixeldev/el-chevere-web",
			alt: i18n.PROJECT_EL_CHEVERE_ALT,
		},
		{
			id: "anjocc",
			title: "ANJOCC",
			description: i18n.ANJOCC_OFICIAL_DESCRIPTION,
			imgUrl: "https://rixel.dev/projects/anjocc.webp",
			projectUrl: "https://anjocc.com",
			tags: [TAGS.ASTRO, TAGS.TAILWIND, TAGS.SUPABASE],
			gitCodeUrl: "https://github.com/rixeldev/anjocc-web",
			alt: i18n.PROJECT_ANJOCC_ALT,
		},
		{
			id: "gdn-pro",
			title: "GDN Pro",
			description: i18n.GDN_PRO_DESCRIPTION,
			imgUrl: "https://rixel.dev/projects/gdn-pro.webp",
			projectUrl: "https://gdnpro.com",
			tags: [TAGS.NEXTJS, TAGS.TAILWIND, TAGS.SUPABASE],
			gitCodeUrl: "https://github.com/gdnpro/gdnpro-nextjs",
			alt: i18n.PROJECT_GDN_PRO_ALT,
		},
		{
			id: "stop-trivia",
			title: "Stop Trivia",
			description: i18n.STOPT_TRIVIA_DESCRIPTION,
			imgUrl: "https://rixel.dev/projects/stop-trivia.webp",
			projectUrl:
				"https://play.google.com/store/apps/details?id=com.rilisentertainment.stoptriviaonline",
			tags: [TAGS.REACT_NATIVE, TAGS.FIREBASE, TAGS.ANDROID],
			gitCodeUrl: "https://github.com/rixeldev/stop-trivia",
			alt: i18n.PROJECT_STOP_TRIVIA_ALT,
		},
		{
			id: "gdn-style",
			title: "GDN Style",
			description: i18n.GDN_STYLE_DESCRIPTION,
			imgUrl: "https://rixel.dev/images/gdn-style.webp",
			projectUrl: "https://gdnstyle.com",
			tags: [TAGS.NEXTJS, TAGS.TAILWIND],
			gitCodeUrl: "https://github.com/rixeldev",
			alt: i18n.PROJECT_GDN_STYLE_ALT,
		},
		{
			id: "fire-reservations",
			title: "Fire Reservations",
			description: i18n.FIRE_RESERVATIONS_DESCRIPTION,
			imgUrl: "https://rixel.dev/projects/fire-reservations.webp",
			projectUrl: "https://firereservations.vercel.app/",
			tags: [TAGS.ASTRO, TAGS.TAILWIND],
			gitCodeUrl: "https://github.com/rixeldev/firereservations-official",
			alt: i18n.PROJECT_FIRE_RESERVATIONS_ALT,
		},
	]
}
