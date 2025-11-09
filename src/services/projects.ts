import { type Project } from '@/interfaces/project'
import AstroBrand from '@/icons/AstroBrand.astro'
import Angular from '@/icons/Angular.astro'
import Tailwind from '@/icons/Tailwind.astro'
import Kotlin from '@/icons/Kotlin.astro'
import Firebase from '@/icons/Firebase.astro'
import Android from '@/icons/Android.astro'
import { getI18N } from '@/languages/index'

const TAGS = {
	ASTRO: {
		name: 'Astro',
		class: 'bg-orange-950 text-slate-200',
		iconColor: 'text-orange-600',
		icon: AstroBrand,
	},
	ANGULAR: {
		name: 'Angular',
		class: 'bg-red-950 text-slate-200',
		iconColor: 'text-red-600',
		icon: Angular,
	},
	TAILWIND: {
		name: 'Tailwind CSS',
		class: 'bg-[#003159] text-slate-200',
		iconColor: 'text-[#73bcf6]',
		icon: Tailwind,
	},
	KOTLIN: {
		name: 'Kotlin',
		class: 'bg-indigo-950 text-slate-200',
		iconColor: 'text-indigo-600',
		icon: Kotlin,
	},
	FIREBASE: {
		name: 'Firebase',
		class: 'bg-yellow-950 text-slate-200',
		iconColor: 'text-yellow-600',
		icon: Firebase,
	},
	ANDROID: {
		name: 'Android',
		class: 'bg-green-950 text-slate-200',
		iconColor: 'text-green-600',
		icon: Android,
	},
}

export const projectsService = (currentLocale?: string): Project[] => {
	const i18n = getI18N({ currentLocale })
	return [
		{
			id: 'el-chevere-web',
			title: 'El Chévere - Official Web',
			description: i18n.EL_CHEVERE_WEB_DESCRIPTION,
			imgUrl: 'https://capelix.dev/images/page-presentation.webp',
			projectUrl: 'https://fotoestudioelchevere.com/',
			tags: [TAGS.ASTRO, TAGS.TAILWIND],
			gitCodeUrl: 'https://github.com/Capelix/el-chevere-web',
			alt: 'Easy Short Url shortener Website',
		},
		{
			id: 'fire-reservations',
			title: 'Fire Reservations',
			description: i18n.FIRE_RESERVATIONS_DESCRIPTION,
			imgUrl: 'https://capelix.dev/images/embedded-img.webp',
			projectUrl: 'https://firereservations.vercel.app/',
			tags: [TAGS.ASTRO, TAGS.TAILWIND],
			gitCodeUrl: 'https://github.com/Capelix/firereservations-official',
			alt: 'Fire Reservations website image',
		},
		{
			id: 'stop-trivia',
			title: 'Stop Trivia',
			description: i18n.STOPT_TRIVIA_DESCRIPTION,
			imgUrl: 'https://capelix.dev/images/stop-trivia.webp',
			projectUrl:
				'https://play.google.com/store/apps/details?id=com.rilisentertainment.stoptriviaonline',
			tags: [TAGS.KOTLIN, TAGS.FIREBASE, TAGS.ANDROID],
			gitCodeUrl: 'https://github.com/Capelix/stop-trivia',
			alt: 'Stop Trivia Android Game',
		},
		{
			id: 'anjocc-oficial',
			title: 'ANJOCC Oficial',
			description: i18n.ANJOCC_OFICIAL_DESCRIPTION,
			imgUrl: 'https://capelix.dev/images/anjocc-oficial.webp',
			projectUrl: 'https://anjocc.com',
			tags: [TAGS.ASTRO, TAGS.TAILWIND],
			gitCodeUrl: 'https://github.com/Capelix/anjocc-oficial',
			alt: 'ANJOCC Oficial Web Page',
		},
		{
			id: 'gdn-style',
			title: 'GDN Style',
			description: i18n.GDN_STYLE_DESCRIPTION,
			imgUrl: 'https://capelix.dev/images/gdn-style.webp',
			projectUrl: 'https://gdnstyle.com',
			tags: [TAGS.ASTRO, TAGS.TAILWIND],
			gitCodeUrl: 'https://github.com/Capelix',
			alt: 'GDN Style Oficial Web Page',
		},
	]
}
