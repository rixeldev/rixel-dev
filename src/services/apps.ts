import { normalizeLocale } from "@/locales/index"

type Locale = "en" | "es"
type Copy = Record<Locale, string>

const pick = (copy: Copy, locale: Locale) => copy[locale]

interface AppFeatureCopy {
	title: Copy
	description: Copy
}

interface AppStepCopy {
	title: Copy
	description: Copy
}

interface AppFactCopy {
	label: Copy
	value: Copy
}

interface AppScreenshotCopy {
	src: string
	/** Optional Spanish variant of the same asset. */
	srcEs?: string
	width: number
	height: number
	alt: Copy
}

interface AppPromoCopy extends AppScreenshotCopy {}

interface AppRecord {
	slug: string
	name: string
	playUrl: string
	packageId: string
	icon: string
	/** Tailwind classes kept as literals so the compiler can see them. */
	brand: {
		glow: string
		text: string
		chip: string
		ring: string
	}
	featureGraphic: AppPromoCopy
	screenshots: AppScreenshotCopy[]
	stack: string[]
	copy: {
		tagline: Copy
		category: Copy
		intro: Copy
		description: Copy[]
		highlights: Copy[]
		features: AppFeatureCopy[]
		steps: AppStepCopy[]
		facts: AppFactCopy[]
		screenshotAlt: Copy
		version: Copy
		price: Copy
	}
}

export interface AppFeature {
	title: string
	description: string
}

export interface AppStep {
	title: string
	description: string
}

export interface AppFact {
	label: string
	value: string
}

export interface AppScreenshot {
	src: string
	width: number
	height: number
	alt: string
}

export interface AppPromo {
	src: string
	width: number
	height: number
	alt: string
}

export interface AppInfo {
	slug: string
	name: string
	tagline: string
	category: string
	intro: string
	description: string[]
	highlights: string[]
	features: AppFeature[]
	steps: AppStep[]
	facts: AppFact[]
	stack: string[]
	playUrl: string
	packageId: string
	icon: string
	featureGraphic: AppPromo
	screenshots: AppScreenshot[]
	version: string
	price: string
	brand: AppRecord["brand"]
}

const STOP_TRIVIA_PLAY_URL =
	"https://play.google.com/store/apps/details?id=com.rilisentertainment.stoptriviaonline"
const SETUNO_PLAY_URL = "https://play.google.com/store/apps/details?id=com.rixeldev.setuno"

const appRecords: AppRecord[] = [
	{
		slug: "stop-trivia",
		name: "Stop Trivia",
		playUrl: STOP_TRIVIA_PLAY_URL,
		packageId: "com.rilisentertainment.stoptriviaonline",
		icon: "/apps/stop-trivia/icon.png",
		brand: {
			glow: "bg-teal-500",
			text: "text-teal-300",
			chip: "border-teal-400/30 bg-teal-400/10 text-teal-200",
			ring: "ring-teal-400/30",
		},
		featureGraphic: {
			src: "/apps/stop-trivia/en/banner.png",
			srcEs: "/apps/stop-trivia/es/banner-es.png",
			width: 1798,
			height: 875,
			alt: {
				en: "Stop Trivia key art with the All Games line-up and the Google Play badge",
				es: "Arte promocional de Stop Trivia con la colección de juegos y la insignia de Google Play",
			},
		},
		screenshots: [
			{
				src: "/apps/stop-trivia/en/1.png",
				srcEs: "/apps/stop-trivia/es/1-es.png",
				width: 1672,
				height: 941,
				alt: {
					en: "Stop Trivia All Games hub with the nine-game carousel",
					es: "Hub de Todos los Juegos de Stop Trivia con el carrusel de nueve juegos",
				},
			},
			{
				src: "/apps/stop-trivia/en/2.png",
				srcEs: "/apps/stop-trivia/es/2-es.png",
				width: 1672,
				height: 941,
				alt: {
					en: "Stop Trivia customization screen with themes, frames and victory styles",
					es: "Pantalla de personalización de Stop Trivia con temas, marcos y estilos de victoria",
				},
			},
			{
				src: "/apps/stop-trivia/en/3.png",
				srcEs: "/apps/stop-trivia/es/3-es.png",
				width: 1672,
				height: 941,
				alt: {
					en: "Stop Trivia events screen with limited-time challenges and rewards",
					es: "Pantalla de eventos de Stop Trivia con retos temporales y recompensas",
				},
			},
			{
				src: "/apps/stop-trivia/en/4.png",
				srcEs: "/apps/stop-trivia/es/4-es.png",
				width: 1672,
				height: 941,
				alt: {
					en: "Stop Trivia achievements screen with claimable rewards",
					es: "Pantalla de logros de Stop Trivia con recompensas para reclamar",
				},
			},
			{
				src: "/apps/stop-trivia/en/5.png",
				srcEs: "/apps/stop-trivia/es/5-es.png",
				width: 1672,
				height: 941,
				alt: {
					en: "Stop Trivia ranked screen with the competitive ladder and season progress",
					es: "Pantalla de ranked de Stop Trivia con la escalera competitiva y el progreso de temporada",
				},
			},
			{
				src: "/apps/stop-trivia/en/6.png",
				srcEs: "/apps/stop-trivia/es/6-es.png",
				width: 1672,
				height: 941,
				alt: {
					en: "Stop Trivia player profile and global leaderboard",
					es: "Perfil de jugador y clasificación global de Stop Trivia",
				},
			},
		],
		stack: [
			"React Native",
			"Expo",
			"TypeScript",
			"Firebase",
			"Google Play Games",
			"AdMob",
			"Sentry",
			"Reanimated",
		],
		copy: {
			tagline: {
				en: "Nine games, one room, and the classic STOP! you already know.",
				es: "Nueve juegos, una sala y el STOP! de siempre.",
			},
			category: {
				en: "Word & party games",
				es: "Juegos de palabras y fiesta",
			},
			intro: {
				en: "The pen-and-paper classic rebuilt for online rooms, with eight more games to play solo, against the CPU or with friends.",
				es: "El clásico del papel y lápiz reconstruido para salas online, con ocho juegos más para jugar solo, contra la máquina o con amigos.",
			},
			description: [
				{
					en: "Stop Trivia started as the game you played on paper: a letter appears, you fill ten categories and you shout STOP! before anyone else. Version 4.3 turns that ritual into a full arcade where every game has its own rules, its own rooms and its own way to win.",
					es: "Stop Trivia nació como el juego de papel: aparece una letra, rellenas diez categorías y gritas STOP! antes que nadie. La versión 4.3 convierte ese ritual en una arcade completa donde cada juego tiene sus reglas, sus salas y su propia forma de ganar.",
				},
				{
					en: "Play Stop with up to four players, chain several rounds in a party room for eight, or jump into Trivia, Tic Tac Toe, Connect 4, Hangman, Blackjack, Yatzy and Timbiriche. Online matches run in real time with room codes, invitations and async duels when your friends are offline.",
					es: "Juega a Stop con hasta cuatro personas, encadena rondas en una sala de fiesta para ocho o entra en Trivia, Tic Tac Toe, Conecta 4, Ahorcado, Blackjack, Yatzy y Timbiriche. Las partidas online van en tiempo real con códigos de sala, invitaciones y duelos asíncronos cuando tus amigos no están conectados.",
				},
			],
			highlights: [
				{ en: "9 games in one hub", es: "9 juegos en un solo hub" },
				{ en: "Rooms by code", es: "Salas por código" },
				{ en: "Up to 8 players", es: "Hasta 8 jugadores" },
				{ en: "Offline modes", es: "Modos sin conexión" },
			],
			features: [
				{
					title: { en: "The classic STOP!", es: "El STOP! de siempre" },
					description: {
						en: "Ten categories, one letter and a timer. Choose 1, 3 or 5 minutes, up to 20 rounds, and whether letters are vowels, consonants or both. In online matches the table reviews each answer: two objections and the word is out.",
						es: "Diez categorías, una letra y un temporizador. Elige 1, 3 o 5 minutos, hasta 20 rondas y si las letras son vocales, consonantes o ambas. En las partidas online la mesa revisa cada respuesta: dos objeciones y la palabra queda fuera.",
					},
				},
				{
					title: { en: "Nine games, one hub", es: "Nueve juegos, un solo hub" },
					description: {
						en: "Stop, Trivia, Tic Tac Toe (with 4×4 and 5×5 boards), Timbiriche, Connect 4, Hangman, Blackjack, Yatzy and Party Rooms. Pick a game, then pick a mode — no menus buried three levels deep.",
						es: "Stop, Trivia, Tic Tac Toe (con tableros 4×4 y 5×5), Timbiriche, Conecta 4, Ahorcado, Blackjack, Yatzy y Salas de fiesta. Elige juego y elige modo, sin menús enterrados tres niveles más abajo.",
					},
				},
				{
					title: { en: "Rooms, codes and party mode", es: "Salas, códigos y modo fiesta" },
					description: {
						en: "Create a room, share the code and play in real time. Party Rooms let up to eight friends chain several games without leaving, including trivia packs on science, geography, history, animals, sports, technology and culture.",
						es: "Crea una sala, comparte el código y juega en tiempo real. Las Salas de fiesta dejan que hasta ocho amigos encadenen varios juegos sin salir, con packs de trivia de ciencia, geografía, historia, animales, deportes, tecnología y cultura.",
					},
				},
				{
					title: { en: "Solo, CPU or online", es: "Solo, contra la máquina u online" },
					description: {
						en: "Seven of the nine games work offline and against the machine, so a flight, a subway ride or a bad connection never stops the game. Online adds ranked play, clubs and async duels.",
						es: "Siete de los nueve juegos funcionan sin conexión y contra la máquina, así que un vuelo, el metro o una mala conexión nunca detienen la partida. El online añade ranked, clubes y duelos asíncronos.",
					},
				},
				{
					title: { en: "Daily reasons to return", es: "Razones para volver cada día" },
					description: {
						en: "A login calendar, a weekly chest, daily missions, the Today's Cup leaderboard, a welcome-back chest and eleven extra mini-games. Coins and gems buy cosmetics, boosts and second chances.",
						es: "Calendario de inicio de sesión, cofre semanal, misiones diarias, la clasificatoria Copa del día, cofre de bienvenida y once minijuegos extra. Las monedas y gemas compran cosméticos, mejoras y segundas oportunidades.",
					},
				},
				{
					title: { en: "Ranks, seasons and clubs", es: "Rangos, temporadas y clubes" },
					description: {
						en: "Seven ranks with three divisions, 56-day seasons, a 30-level season pass, 52 achievements mirrored to Google Play Games, clubs with chat and leaderboards that reset with every season.",
						es: "Siete rangos con tres divisiones, temporadas de 56 días, pase de temporada de 30 niveles, 52 logros sincronizados con Google Play Games, clubes con chat y clasificatorias que se reinician cada temporada.",
					},
				},
				{
					title: { en: "Make it yours", es: "Hazlo tuyo" },
					description: {
						en: "22 themes, 13 background patterns, avatars, frames and win effects. Haptics, click sounds and a fully translated interface in English, Spanish, French and Portuguese.",
						es: "22 temas, 13 fondos, avatares, marcos y efectos de victoria. Hápticos, sonidos de clic y una interfaz traducida por completo a inglés, español, francés y portugués.",
					},
				},
			],
			steps: [
				{
					title: { en: "Pick a game", es: "Elige un juego" },
					description: {
						en: "The hub shows all nine games in a swipeable carousel with your coins, gems and profile on top.",
						es: "El hub muestra los nueve juegos en un carrusel deslizable con tus monedas, gemas y perfil arriba.",
					},
				},
				{
					title: { en: "Choose the mode", es: "Elige el modo" },
					description: {
						en: "Offline, against the CPU or online. In Stop you also set the time, rounds and letter pool.",
						es: "Sin conexión, contra la máquina u online. En Stop también ajustas tiempo, rondas y tipo de letras.",
					},
				},
				{
					title: { en: "Share the room code", es: "Comparte el código" },
					description: {
						en: "Create a room, send the code and wait for the table to fill — or join a public room in one tap.",
						es: "Crea una sala, envía el código y espera a que se llene la mesa, o únete a una sala pública con un toque.",
					},
				},
				{
					title: { en: "Play, review, repeat", es: "Juega, revisa, repite" },
					description: {
						en: "The 3-2-1 countdown starts, everyone writes, and the table votes on the answers before the winner screen.",
						es: "Arranca la cuenta atrás 3-2-1, todos escriben y la mesa vota las respuestas antes de la pantalla de ganador.",
					},
				},
			],
			facts: [
				{
					label: { en: "Category", es: "Categoría" },
					value: { en: "Word & party games", es: "Palabras y fiesta" },
				},
				{
					label: { en: "Platform", es: "Plataforma" },
					value: { en: "Android 7.0+", es: "Android 7.0+" },
				},
				{
					label: { en: "Price", es: "Precio" },
					value: { en: "Free · optional purchases", es: "Gratis · compras opcionales" },
				},
				{
					label: { en: "Languages", es: "Idiomas" },
					value: { en: "EN · ES · FR · PT-BR", es: "EN · ES · FR · PT-BR" },
				},
				{
					label: { en: "Players", es: "Jugadores" },
					value: { en: "1 to 8", es: "1 a 8" },
				},
				{
					label: { en: "Developer", es: "Desarrollador" },
					value: { en: "RixelDev", es: "RixelDev" },
				},
			],
			screenshotAlt: {
				en: "Stop Trivia interface",
				es: "Interfaz de Stop Trivia",
			},
			version: { en: "4.3.0", es: "4.3.0" },
			price: { en: "Free", es: "Gratis" },
		},
	},
	{
		slug: "setuno",
		name: "Setuno",
		playUrl: SETUNO_PLAY_URL,
		packageId: "com.rixeldev.setuno",
		icon: "/apps/setuno/icon.png",
		brand: {
			glow: "bg-orange-500",
			text: "text-orange-300",
			chip: "border-orange-400/30 bg-orange-400/10 text-orange-200",
			ring: "ring-orange-400/30",
		},
		featureGraphic: {
			src: "/apps/setuno/en/feature-graphic-1024x500.png",
			srcEs: "/apps/setuno/es/feature-graphic-1024x500.png",
			width: 1024,
			height: 500,
			alt: {
				en: "Setuno feature graphic with the band dashboard, chord shortcuts and the app icon",
				es: "Gráfico de Setuno con el panel de banda, los acordes rápidos y el icono de la app",
			},
		},
		screenshots: [
			{
				src: "/apps/setuno/en/screenshot-1-home-1080x1920.png",
				srcEs: "/apps/setuno/es/screenshot-1-home-1080x1920.png",
				width: 1080,
				height: 1920,
				alt: {
					en: "Setuno band dashboard with the next gig, songs, setlists and members",
					es: "Panel de banda de Setuno con el próximo bolo, canciones, listas e integrantes",
				},
			},
			{
				src: "/apps/setuno/en/screenshot-2-songs-1080x1920.png",
				srcEs: "/apps/setuno/es/screenshot-2-songs-1080x1920.png",
				width: 1080,
				height: 1920,
				alt: {
					en: "Setuno song library with key, tempo and status filters",
					es: "Biblioteca de canciones de Setuno con filtros de tonalidad, tempo y estado",
				},
			},
			{
				src: "/apps/setuno/en/screenshot-3-song-1080x1920.png",
				srcEs: "/apps/setuno/es/screenshot-3-song-1080x1920.png",
				width: 1080,
				height: 1920,
				alt: {
					en: "Setuno stage reader showing chords above the lyrics",
					es: "Lector de escenario de Setuno con acordes sobre la letra",
				},
			},
			{
				src: "/apps/setuno/en/screenshot-4-edit-1080x1920.png",
				srcEs: "/apps/setuno/es/screenshot-4-edit-1080x1920.png",
				width: 1080,
				height: 1920,
				alt: {
					en: "Setuno song editor with lyrics, chords and song metadata",
					es: "Editor de canciones de Setuno con letra, acordes y metadatos",
				},
			},
			{
				src: "/apps/setuno/en/screenshot-5-dual-1080x1920.png",
				srcEs: "/apps/setuno/es/screenshot-5-dual-1080x1920.png",
				width: 1080,
				height: 1920,
				alt: {
					en: "Setuno songbook and stage reader side by side",
					es: "Cancionero y lector de escenario de Setuno uno al lado del otro",
				},
			},
		],
		stack: [
			"React Native",
			"Expo",
			"TypeScript",
			"Firebase",
			"Android App Links",
			"Crashlytics",
			"Reanimated",
		],
		copy: {
			tagline: {
				en: "Your band's songbook, setlists and gigs — on stage and offline.",
				es: "El cancionero, las listas y los bolos de tu banda, en el escenario y sin conexión.",
			},
			category: {
				en: "Music & productivity",
				es: "Música y productividad",
			},
			intro: {
				en: "Chords over every syllable, setlists that fit the night and a reader built for the stage. For bands tired of blurry photos and lost sheets.",
				es: "Acordes sobre cada sílaba, listas que encajan con la noche y un lector hecho para el escenario. Para bandas cansadas de fotos borrosas y hojas perdidas.",
			},
			description: [
				{
					en: "Setuno keeps the whole band on the same page: songs with chords and lyrics, reusable setlists, a shared calendar of gigs and rehearsals, and a full-screen reader with stage mode, autoscroll and chord diagrams.",
					es: "Setuno mantiene a toda la banda en la misma página: canciones con acordes y letra, listas reutilizables, un calendario compartido de bolos y ensayos y un lector a pantalla completa con modo escenario, autoscroll y diagramas de acordes.",
				},
				{
					en: "It works offline and syncs when the connection returns. Invite bandmates as admin or musician, and keep the repertoire tidy with roles, suggestions, comments and version history.",
					es: "Funciona sin conexión y sincroniza cuando vuelve la cobertura. Invita a tus compañeros como administrador o músico, y mantén el repertorio ordenado con roles, sugerencias, comentarios e historial de versiones.",
				},
			],
			highlights: [
				{ en: "Offline-first", es: "Funciona sin conexión" },
				{ en: "Stage reader", es: "Modo escenario" },
				{ en: "Setlists & gigs", es: "Listas y bolos" },
				{ en: "Android & web", es: "Android y web" },
			],
			features: [
				{
					title: { en: "Chords that stay in place", es: "Acordes que no se mueven" },
					description: {
						en: "Every chord sits exactly above its syllable while you type. Build sections, reorder lines and keep the song structured instead of a wall of text.",
						es: "Cada acorde queda justo encima de su sílaba mientras escribes. Crea secciones, reordena líneas y mantén la canción estructurada en lugar de un muro de texto.",
					},
				},
				{
					title: { en: "Transpose, capo and details", es: "Transporte, cejilla y detalles" },
					description: {
						en: "Change key by semitones without touching the original, switch between American and Latin notation, set capo, BPM, duration, genre, tags and status, and step back through the version history.",
						es: "Cambia de tono por semitonos sin tocar la original, alterna entre cifra americana y latina, define cejilla, BPM, duración, género, etiquetas y estado, y vuelve atrás en el historial de versiones.",
					},
				},
				{
					title: { en: "A reader made for the stage", es: "Un lector hecho para el escenario" },
					description: {
						en: "Full screen, pinch-to-resize lyrics, stage mode with the screen kept awake, chord shapes for guitar and piano with the capo applied, and the exact spot where you stopped.",
						es: "Pantalla completa, letra ajustable con pinza, modo escenario con la pantalla siempre activa, posiciones de acorde para guitarra y piano con la cejilla aplicada y el punto exacto donde lo dejaste.",
					},
				},
				{
					title: { en: "Setlists with a time budget", es: "Listas con presupuesto de tiempo" },
					description: {
						en: "Order the repertoire, see the estimated duration, duplicate a list for the next show and attach it to the gig so everyone opens the same running order.",
						es: "Ordena el repertorio, consulta la duración estimada, duplica una lista para el siguiente bolo y adjúntala al evento para que todos abran el mismo orden.",
					},
				},
				{
					title: { en: "Gigs, venues and calendar", es: "Bolos, salas y calendario" },
					description: {
						en: "Create gigs and rehearsals with venue, dates, times and status, browse them in a month calendar and export the plan. The dashboard always shows what is coming up next.",
						es: "Crea bolos y ensayos con sala, fechas, horas y estado, consúltalos en un calendario mensual y exporta el plan. El panel siempre muestra lo que viene después.",
					},
				},
				{
					title: { en: "Band roles and suggestions", es: "Roles de banda y sugerencias" },
					description: {
						en: "Invite bandmates as admin or musician, review suggestions with comments, follow the activity feed and keep every change traceable inside the band.",
						es: "Invita a tus compañeros como administrador o músico, revisa sugerencias con comentarios, sigue el feed de actividad y mantén cada cambio trazable dentro de la banda.",
					},
				},
				{
					title: { en: "Offline sync, Android and web", es: "Sincronía offline, Android y web" },
					description: {
						en: "Changes are saved on the device and sync when the connection returns. Android and the installable web app share the same account, with dark, light and six accent colours.",
						es: "Los cambios se guardan en el dispositivo y se sincronizan cuando vuelve la conexión. Android y la web instalable comparten la misma cuenta, con tema claro, oscuro y seis acentos de color.",
					},
				},
			],
			steps: [
				{
					title: { en: "Create the band", es: "Crea la banda" },
					description: {
						en: "Sign in, name the band and invite your bandmates by email with the role each one needs.",
						es: "Entra, ponle nombre a la banda e invita por correo a cada compañero con el rol que necesite.",
					},
				},
				{
					title: { en: "Add your songs", es: "Añade tus canciones" },
					description: {
						en: "Write them by hand with the chord editor. Set key, capo, tempo, duration and tags once.",
						es: "Escríbelas a mano con el editor de acordes. Define tonalidad, cejilla, tempo, duración y etiquetas una sola vez.",
					},
				},
				{
					title: { en: "Build the setlist", es: "Monta la lista" },
					description: {
						en: "Pick the songs, drag them into order and check the estimated duration before you save.",
						es: "Elige las canciones, ordénalas y comprueba la duración estimada antes de guardar.",
					},
				},
				{
					title: { en: "Take it to the stage", es: "Llévalo al escenario" },
					description: {
						en: "Open stage mode, keep the screen awake and move through the list while the band follows the same order.",
						es: "Abre el modo escenario, mantén la pantalla activa y avanza por la lista mientras la banda sigue el mismo orden.",
					},
				},
			],
			facts: [
				{
					label: { en: "Category", es: "Categoría" },
					value: { en: "Music & productivity", es: "Música y productividad" },
				},
				{
					label: { en: "Platform", es: "Plataforma" },
					value: { en: "Android · Web", es: "Android · Web" },
				},
				{
					label: { en: "Price", es: "Precio" },
					value: { en: "Free · Pro optional", es: "Gratis · Pro opcional" },
				},
				{
					label: { en: "Languages", es: "Idiomas" },
					value: { en: "EN · ES", es: "EN · ES" },
				},
				{
					label: { en: "Free plan", es: "Plan gratis" },
					value: { en: "1 band · 50 songs", es: "1 banda · 50 canciones" },
				},
				{
					label: { en: "Developer", es: "Desarrollador" },
					value: { en: "RixelDev", es: "RixelDev" },
				},
			],
			screenshotAlt: {
				en: "Setuno interface",
				es: "Interfaz de Setuno",
			},
			version: { en: "1.0.0", es: "1.0.0" },
			price: { en: "Free", es: "Gratis" },
		},
	},
]

const resolveAsset = (asset: AppPromoCopy, locale: Locale) => ({
	src: locale === "es" && asset.srcEs ? asset.srcEs : asset.src,
	width: asset.width,
	height: asset.height,
	alt: pick(asset.alt, locale),
})

const resolveApp = (record: AppRecord, locale: Locale): AppInfo => {
	const { copy } = record

	return {
		slug: record.slug,
		name: record.name,
		tagline: pick(copy.tagline, locale),
		category: pick(copy.category, locale),
		intro: pick(copy.intro, locale),
		description: copy.description.map((paragraph) => pick(paragraph, locale)),
		highlights: copy.highlights.map((highlight) => pick(highlight, locale)),
		features: copy.features.map((feature) => ({
			title: pick(feature.title, locale),
			description: pick(feature.description, locale),
		})),
		steps: copy.steps.map((step) => ({
			title: pick(step.title, locale),
			description: pick(step.description, locale),
		})),
		facts: copy.facts.map((fact) => ({
			label: pick(fact.label, locale),
			value: pick(fact.value, locale),
		})),
		stack: record.stack,
		playUrl: record.playUrl,
		packageId: record.packageId,
		icon: record.icon,
		featureGraphic: resolveAsset(record.featureGraphic, locale),
		screenshots: record.screenshots.map((screenshot) => ({
			src: locale === "es" && screenshot.srcEs ? screenshot.srcEs : screenshot.src,
			width: screenshot.width,
			height: screenshot.height,
			alt: pick(screenshot.alt, locale),
		})),
		version: pick(copy.version, locale),
		price: pick(copy.price, locale),
		brand: record.brand,
	}
}

export const appsService = (locale?: string): AppInfo[] => {
	const normalized = normalizeLocale(locale) as Locale
	return appRecords.map((record) => resolveApp(record, normalized))
}

export const getAppBySlug = (slug: string, locale?: string): AppInfo | undefined => {
	const normalized = normalizeLocale(locale) as Locale
	const record = appRecords.find((app) => app.slug === slug)
	return record ? resolveApp(record, normalized) : undefined
}
