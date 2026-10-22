import type { LegalDocumentCopy } from "@/interfaces/legal"

export const privacyCopy: LegalDocumentCopy = {
	id: "privacy",
	title: { en: "Privacy Policy", es: "Política de Privacidad" },
	description: {
		en: "What data RixelDev collects across rixel.dev, Stop Trivia and Setuno, why we collect it, who we share it with, how long we keep it and how to delete your account.",
		es: "Qué datos recopila RixelDev en rixel.dev, Stop Trivia y Setuno, por qué los recopilamos, con quién los compartimos, cuánto tiempo los conservamos y cómo borrar tu cuenta.",
	},
	updated: { en: "October 21, 2026", es: "21 de octubre de 2026" },
	effective: { en: "October 21, 2026", es: "21 de octubre de 2026" },
	intro: [
		{
			en: "This policy explains how personal data is handled on this website, in the client photo galleries and in our Android apps. It is written to be read, not to hide behind legal language: if something is unclear, write to us and we will explain it.",
			es: "Esta política explica cómo se tratan los datos personales en este sitio web, en las galerías de fotos de clientes y en nuestras apps para Android. Está escrita para leerse, no para esconderse detrás de lenguaje legal: si algo no queda claro, escríbenos y te lo explicamos.",
		},
	],
	summary: [
		{
			en: "We collect only what the products need: your account, the content you create, technical data and, in Stop Trivia, advertising identifiers.",
			es: "Recopilamos solo lo que los productos necesitan: tu cuenta, el contenido que creas, datos técnicos y, en Stop Trivia, identificadores publicitarios.",
		},
		{
			en: "We do not sell your data, and rixel.dev runs no advertising or analytics cookies.",
			es: "No vendemos tus datos y rixel.dev no usa cookies publicitarias ni de analítica.",
		},
		{
			en: "You can delete your account and its data at any time, from the app or by email, and we complete the request within 30 days.",
			es: "Puedes borrar tu cuenta y sus datos en cualquier momento, desde la app o por correo, y completamos la solicitud en un plazo de 30 días.",
		},
		{
			en: "Personalised ads and optional notifications only happen with your consent where the law requires it.",
			es: "Los anuncios personalizados y las notificaciones opcionales solo se activan con tu consentimiento cuando la ley lo exige.",
		},
	],
	sections: [
		{
			id: "who-we-are",
			title: {
				en: "Who we are and what this policy covers",
				es: "Quiénes somos y qué cubre esta política",
			},
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "RixelDev is the independent studio of **Rikelvi Capellán García**, based in La Vega, Dominican Republic. This policy applies to rixel.dev, the client photo galleries at rixel.dev/gallery, the Android game **Stop Trivia** (published on Google Play as Rilis Entertainment, package `com.rilisentertainment.stoptriviaonline`), the Android app **Setuno** (package `com.rixeldev.setuno`) and the installable Setuno web app.",
						es: "RixelDev es el estudio independiente de **Rikelvi Capellán García**, con sede en La Vega, República Dominicana. Esta política aplica a rixel.dev, a las galerías de fotos de clientes en rixel.dev/gallery, al juego para Android **Stop Trivia** (publicado en Google Play como Rilis Entertainment, paquete `com.rilisentertainment.stoptriviaonline`), a la app para Android **Setuno** (paquete `com.rixeldev.setuno`) y a la versión web instalable de Setuno.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "The same person operates both publisher names, so “we”, “us” and “our” refer to RixelDev and Rilis Entertainment throughout this document. For the purposes of the EU and UK GDPR we act as the data controller for the processing described here.",
						es: "La misma persona opera ambos nombres de desarrollador, así que “nosotros”, “nos” y “nuestro” se refieren a RixelDev y a Rilis Entertainment en todo este documento. A efectos del RGPD de la Unión Europea y del Reino Unido, actuamos como responsable del tratamiento descrito aquí.",
					},
				},
				{
					kind: "callout",
					tone: "accent",
					title: { en: "Scope", es: "Alcance" },
					text: {
						en: "This policy does not cover Google Play, Google Play Games, Firebase or any other third-party service. Those have their own policies, linked in [Third-party services](#third-party-services).",
						es: "Esta política no cubre Google Play, Google Play Games, Firebase ni ningún otro servicio de terceros. Esos tienen sus propias políticas, enlazadas en [Servicios de terceros](#third-party-services).",
					},
				},
			],
		},
		{
			id: "data-we-collect",
			title: { en: "Information we collect", es: "Información que recopilamos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We aim to collect as little as possible. What we collect depends on the product you use and the features you turn on.",
						es: "Procuramos recopilar lo mínimo posible. Lo que recopilamos depende del producto que uses y de las funciones que actives.",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "**Account details.** When you create a Setuno account or sign in with Google Play Games in Stop Trivia, we receive an account identifier, your display name, your email address and your profile picture, if your provider shares them.",
							es: "**Datos de la cuenta.** Cuando creas una cuenta de Setuno o inicias sesión con Google Play Games en Stop Trivia, recibimos un identificador de cuenta, tu nombre visible, tu correo electrónico y tu foto de perfil, si tu proveedor los comparte.",
						},
						{
							en: "**Content you create.** Songs with chords and lyrics, setlists, gigs and rehearsals, venue notes, band roles, invitations, suggestions, comments and version history in Setuno; club names, chat messages and room details in Stop Trivia; and the photos you select in a client gallery.",
							es: "**Contenido que creas.** Canciones con acordes y letra, listas, bolos y ensayos, notas de local, roles de la banda, invitaciones, sugerencias, comentarios e historial de versiones en Setuno; nombres de clubes, mensajes de chat y detalles de salas en Stop Trivia; y las fotos que seleccionas en una galería de cliente.",
						},
						{
							en: "**Gameplay and app activity.** Matches, scores, ranks, divisions, seasons, achievements, in-game items and currency, and the clubs or rooms you join.",
							es: "**Actividad de juego y de la app.** Partidas, puntuaciones, rangos, divisiones, temporadas, logros, objetos y moneda del juego, y los clubes o salas a los que te unes.",
						},
						{
							en: "**Device and technical data.** Device model, operating system and app version, language, approximate region derived from your IP address, crash reports and performance traces.",
							es: "**Datos técnicos del dispositivo.** Modelo del dispositivo, versión del sistema operativo y de la app, idioma, región aproximada derivada de tu dirección IP, informes de fallos y trazas de rendimiento.",
						},
						{
							en: "**Purchase data.** Product identifiers and purchase tokens for in-app purchases. We never see or store your card number or billing address.",
							es: "**Datos de compra.** Identificadores de producto y tokens de compra de las compras dentro de la app. Nunca vemos ni almacenamos el número de tu tarjeta ni tu dirección de facturación.",
						},
						{
							en: "**Messages you send us.** The name, email address and message you submit through the contact form, or that you send us by email or WhatsApp.",
							es: "**Mensajes que nos envías.** El nombre, el correo y el mensaje que envías por el formulario de contacto, o que nos mandas por correo o WhatsApp.",
						},
					],
				},
				{
					kind: "callout",
					tone: "warning",
					title: { en: "What we do not ask for", es: "Lo que no pedimos" },
					text: {
						en: "We do not request access to your contacts, camera, microphone, photo library or precise GPS location. If a future feature needs one of them, the app will ask for permission first and this policy will be updated before it ships.",
						es: "No solicitamos acceso a tus contactos, cámara, micrófono, galería de fotos ni ubicación GPS precisa. Si una función futura necesita alguno, la app pedirá permiso primero y esta política se actualizará antes de publicarla.",
					},
				},
			],
		},
		{
			id: "how-we-use",
			title: { en: "How we use information", es: "Cómo usamos la información" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We use personal data only for the purposes below. We do not use your Setuno repertoire or your Stop Trivia chat to target ads.",
						es: "Usamos los datos personales solo para los fines siguientes. No usamos el repertorio de Setuno ni el chat de Stop Trivia para segmentar anuncios.",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "Create and operate your account, and keep your device and the web app in sync.",
							es: "Crear y operar tu cuenta, y mantener sincronizados tu dispositivo y la versión web.",
						},
						{
							en: "Run multiplayer rooms, leaderboards, seasons, clubs and the social features you join.",
							es: "Gestionar salas multijugador, clasificaciones, temporadas, clubes y las funciones sociales a las que te unes.",
						},
						{
							en: "Keep the apps available offline and reconcile changes when the connection returns.",
							es: "Mantener las apps disponibles sin conexión y conciliar los cambios cuando vuelve la conexión.",
						},
						{
							en: "Moderate communities, prevent cheating, abuse and fraud, and keep the service secure.",
							es: "Moderar comunidades, prevenir trampas, abuso y fraude, y mantener el servicio seguro.",
						},
						{
							en: "Process purchases, restore them on your devices and handle refunds requested through Google Play.",
							es: "Procesar compras, restaurarlas en tus dispositivos y gestionar los reembolsos solicitados a través de Google Play.",
						},
						{
							en: "Send service messages such as password resets, security alerts and deletion confirmations. Marketing email is sent only if you opt in.",
							es: "Enviar mensajes de servicio como restablecimiento de contraseña, alertas de seguridad y confirmaciones de borrado. El correo comercial solo se envía si lo autorizas.",
						},
						{
							en: "Diagnose crashes, measure performance and improve usability.",
							es: "Diagnosticar fallos, medir el rendimiento y mejorar la usabilidad.",
						},
						{
							en: "Show ads in Stop Trivia, as described in [Advertising](#advertising).",
							es: "Mostrar anuncios en Stop Trivia, como se describe en [Publicidad](#advertising).",
						},
						{
							en: "Comply with legal obligations and enforce our [Terms & Conditions](/terms).",
							es: "Cumplir obligaciones legales y hacer valer nuestros [Términos y Condiciones](/terms).",
						},
					],
				},
			],
		},
		{
			id: "legal-bases",
			title: { en: "Legal bases for processing", es: "Bases legales del tratamiento" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "If you are in the European Economic Area, the United Kingdom or Switzerland, we rely on the following legal bases. For everyone else, we process data because you asked us to provide the service, because you consented, or because we have a legitimate interest that does not override your rights.",
						es: "Si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, nos apoyamos en las siguientes bases legales. Para el resto, tratamos los datos porque nos pediste prestar el servicio, porque diste tu consentimiento o porque tenemos un interés legítimo que no prevalece sobre tus derechos.",
					},
				},
				{
					kind: "table",
					head: [
						{ en: "Purpose", es: "Finalidad" },
						{ en: "Legal basis", es: "Base legal" },
					],
					rows: [
						[
							{
								en: "Creating and operating your account, and syncing your content",
								es: "Crear y operar tu cuenta, y sincronizar tu contenido",
							},
							{ en: "Performance of a contract", es: "Ejecución de un contrato" },
						],
						[
							{
								en: "Multiplayer, leaderboards and social features you join",
								es: "Multijugador, clasificaciones y funciones sociales a las que te unes",
							},
							{ en: "Performance of a contract", es: "Ejecución de un contrato" },
						],
						[
							{
								en: "Security, abuse prevention and service integrity",
								es: "Seguridad, prevención de abuso e integridad del servicio",
							},
							{ en: "Legitimate interests", es: "Interés legítimo" },
						],
						[
							{
								en: "Crash diagnostics and product improvement",
								es: "Diagnóstico de fallos y mejora del producto",
							},
							{ en: "Legitimate interests", es: "Interés legítimo" },
						],
						[
							{
								en: "Personalised advertising and optional notifications",
								es: "Publicidad personalizada y notificaciones opcionales",
							},
							{ en: "Consent", es: "Consentimiento" },
						],
						[
							{
								en: "Purchase records and tax obligations",
								es: "Registros de compra y obligaciones fiscales",
							},
							{ en: "Legal obligation", es: "Obligación legal" },
						],
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "When we rely on consent you can withdraw it at any time. Withdrawing does not affect processing that already took place, and it does not stop processing based on another legal basis.",
						es: "Cuando nos apoyamos en el consentimiento puedes retirarlo en cualquier momento. Retirarlo no afecta al tratamiento ya realizado ni impide el tratamiento basado en otra base legal.",
					},
				},
			],
		},
		{
			id: "cookies",
			title: { en: "Cookies and local storage", es: "Cookies y almacenamiento local" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "rixel.dev uses as few cookies as possible. We run no advertising cookies and no third-party analytics on this website.",
						es: "rixel.dev usa las mínimas cookies posibles. No usamos cookies publicitarias ni analítica de terceros en este sitio.",
					},
				},
				{
					kind: "table",
					head: [
						{ en: "Name", es: "Nombre" },
						{ en: "Type", es: "Tipo" },
						{ en: "Purpose", es: "Finalidad" },
						{ en: "Duration", es: "Duración" },
					],
					rows: [
						[
							{ en: "`lang`", es: "`lang`" },
							{ en: "Cookie", es: "Cookie" },
							{
								en: "Remembers whether you read the site in English or Spanish",
								es: "Recuerda si lees el sitio en inglés o en español",
							},
							{ en: "1 year", es: "1 año" },
						],
						[
							{ en: "`admin_session`", es: "`admin_session`" },
							{ en: "Cookie", es: "Cookie" },
							{
								en: "Keeps the site administrator signed in to the gallery panel; only set after a staff login",
								es: "Mantiene al administrador del sitio con sesión iniciada en el panel de galerías; solo se crea tras un inicio de sesión del personal",
							},
							{ en: "12 hours", es: "12 horas" },
						],
						[
							{
								en: "`gallery:selected_codes:<galleryId>`",
								es: "`gallery:selected_codes:<galleryId>`",
							},
							{ en: "Local storage", es: "Almacenamiento local" },
							{
								en: "Remembers which photos you selected in a client gallery, on your own device",
								es: "Recuerda qué fotos seleccionaste en una galería de cliente, en tu propio dispositivo",
							},
							{ en: "Until you clear it", es: "Hasta que lo borres" },
						],
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "You can clear cookies and local storage from your browser settings at any time. Blocking `lang` only makes the site fall back to your browser language; clearing the gallery entry only resets your selection.",
						es: "Puedes borrar cookies y almacenamiento local desde la configuración de tu navegador en cualquier momento. Bloquear `lang` solo hace que el sitio use el idioma de tu navegador; borrar la entrada de la galería solo reinicia tu selección.",
					},
				},
			],
		},
		{
			id: "third-party-services",
			title: {
				en: "Third-party services we share data with",
				es: "Servicios de terceros con los que compartimos datos",
			},
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We do not sell personal data. We share it only with the providers that make the products work, and only what each one needs.",
						es: "No vendemos datos personales. Solo los compartimos con los proveedores que hacen funcionar los productos, y únicamente lo que cada uno necesita.",
					},
				},
				{
					kind: "table",
					head: [
						{ en: "Provider", es: "Proveedor" },
						{ en: "Purpose", es: "Finalidad" },
						{ en: "Data involved", es: "Datos implicados" },
					],
					rows: [
						[
							{ en: "Google Firebase", es: "Google Firebase" },
							{
								en: "Authentication, database and push notifications",
								es: "Autenticación, base de datos y notificaciones push",
							},
							{
								en: "Account identifiers, the content you create, device tokens",
								es: "Identificadores de cuenta, el contenido que creas, tokens de dispositivo",
							},
						],
						[
							{ en: "Google Play Games Services", es: "Google Play Games Services" },
							{
								en: "Sign-in, achievements and leaderboards",
								es: "Inicio de sesión, logros y clasificaciones",
							},
							{
								en: "Player ID, display name, avatar, achievement progress",
								es: "ID de jugador, nombre visible, avatar, progreso de logros",
							},
						],
						[
							{ en: "Google AdMob", es: "Google AdMob" },
							{ en: "Advertising in Stop Trivia", es: "Publicidad en Stop Trivia" },
							{
								en: "Advertising ID, device data, approximate location, ad interactions",
								es: "ID de publicidad, datos del dispositivo, ubicación aproximada, interacciones con anuncios",
							},
						],
						[
							{ en: "Google Play Billing", es: "Google Play Billing" },
							{ en: "In-app purchases", es: "Compras dentro de la app" },
							{
								en: "Purchase tokens and order identifiers",
								es: "Tokens de compra e identificadores de pedido",
							},
						],
						[
							{ en: "Sentry and Firebase Crashlytics", es: "Sentry y Firebase Crashlytics" },
							{ en: "Crash and error reporting", es: "Informes de fallos y errores" },
							{
								en: "Device model, OS version, stack traces, app state at the time of the crash",
								es: "Modelo del dispositivo, versión del sistema, trazas de error y estado de la app al ocurrir el fallo",
							},
						],
						[
							{ en: "Supabase", es: "Supabase" },
							{
								en: "Storage and database for the client photo galleries",
								es: "Almacenamiento y base de datos de las galerías de fotos de clientes",
							},
							{
								en: "Gallery metadata, photo files, PIN hashes and photo selections",
								es: "Metadatos de la galería, archivos de fotos, hashes de PIN y selecciones de fotos",
							},
						],
						[
							{ en: "Resend", es: "Resend" },
							{
								en: "Delivering messages sent from the contact form",
								es: "Entrega de los mensajes enviados desde el formulario de contacto",
							},
							{ en: "Name, email address and message", es: "Nombre, correo electrónico y mensaje" },
						],
						[
							{ en: "Vercel", es: "Vercel" },
							{
								en: "Website hosting and aggregate performance metrics",
								es: "Alojamiento del sitio y métricas agregadas de rendimiento",
							},
							{
								en: "Request data and Core Web Vitals measurements",
								es: "Datos de la petición y mediciones de Core Web Vitals",
							},
						],
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "These providers process data on our behalf or as independent controllers under their own policies. We may also disclose data when the law requires it, to protect someone’s safety, or to establish or defend legal claims. If the products are ever transferred to another owner, data may be transferred as part of that operation, and we will tell you before it happens.",
						es: "Estos proveedores tratan datos por nuestra cuenta o como responsables independientes bajo sus propias políticas. También podemos revelar datos cuando la ley lo exija, para proteger la seguridad de alguien o para formular o defender reclamaciones legales. Si los productos se transfieren a otro titular, los datos podrían transferirse como parte de esa operación, y te lo avisaremos antes de que ocurra.",
					},
				},
			],
		},
		{
			id: "advertising",
			title: { en: "Advertising", es: "Publicidad" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "Stop Trivia shows ads through Google AdMob. Setuno does not display third-party ads, and rixel.dev does not display ads at all.",
						es: "Stop Trivia muestra anuncios a través de Google AdMob. Setuno no muestra anuncios de terceros y rixel.dev no muestra anuncios.",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "AdMob may access your advertising ID, device type, operating system, coarse location and how you interact with an ad.",
							es: "AdMob puede acceder a tu ID de publicidad, tipo de dispositivo, sistema operativo, ubicación aproximada y a cómo interactúas con un anuncio.",
						},
						{
							en: "Where the law requires it (EEA, UK and Switzerland), we ask for consent before serving personalised ads. You can change that choice at any time in the app’s privacy settings.",
							es: "Cuando la ley lo exige (EEE, Reino Unido y Suiza), pedimos consentimiento antes de mostrar anuncios personalizados. Puedes cambiar esa elección en cualquier momento en los ajustes de privacidad de la app.",
						},
						{
							en: "You can reset or delete your advertising ID in Android at Settings → Google → Ads. Non-personalised ads are still shown if you decline personalised ones; they rely on context rather than your advertising ID.",
							es: "Puedes restablecer o eliminar tu ID de publicidad en Android en Ajustes → Google → Anuncios. Si rechazas los anuncios personalizados, seguimos mostrando anuncios no personalizados, basados en el contexto y no en tu ID.",
						},
						{
							en: "If an ad-free option is offered and you buy it, ad requests stop for as long as it is active.",
							es: "Si se ofrece una opción sin anuncios y la compras, las solicitudes de anuncios se detienen mientras esté activa.",
						},
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "You can read more in [Google’s Privacy Policy](https://policies.google.com/privacy), [how AdMob uses data](https://policies.google.com/technologies/partner-sites) and your [Google Ads settings](https://adssettings.google.com).",
						es: "Puedes leer más en la [Política de Privacidad de Google](https://policies.google.com/privacy), en [cómo usa AdMob los datos](https://policies.google.com/technologies/partner-sites) y en tus [ajustes de anuncios de Google](https://adssettings.google.com).",
					},
				},
			],
		},
		{
			id: "purchases",
			title: { en: "Purchases and payments", es: "Compras y pagos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "In-app purchases are processed by Google Play. We receive a purchase token and the product identifier, never your card number or billing address. Google’s [Payments Policy](https://support.google.com/googleplay/android-developer/answer/10281818) and [Terms of Service](https://play.google.com/about/play-terms/) apply to the transaction.",
						es: "Las compras dentro de la app las procesa Google Play. Recibimos un token de compra y el identificador del producto, nunca el número de tu tarjeta ni tu dirección de facturación. A la transacción se le aplican la [Política de Pagos](https://support.google.com/googleplay/android-developer/answer/10281818) y los [Términos de Servicio](https://play.google.com/about/play-terms/) de Google.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "We keep purchase records for as long as tax and accounting rules require, and to restore purchases, resolve disputes and prevent fraud. Deleting your account does not cancel a subscription: manage or cancel it in Google Play → Payments and subscriptions.",
						es: "Conservamos los registros de compra mientras lo exijan las normas fiscales y contables, y para restaurar compras, resolver disputas y prevenir fraudes. Borrar tu cuenta no cancela una suscripción: gestiónala o cancélala en Google Play → Pagos y suscripciones.",
					},
				},
			],
		},
		{
			id: "children",
			title: { en: "Children’s privacy", es: "Privacidad de los menores" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "Our apps and website are not directed to children under 13, or under 16 in the EEA and the UK. We do not knowingly collect personal data from children. Stop Trivia is a party game for a general audience and is not part of Google Play’s Families programme.",
						es: "Nuestras apps y el sitio web no están dirigidos a menores de 13 años, ni a menores de 16 en el EEE y el Reino Unido. No recopilamos datos personales de menores a sabiendas. Stop Trivia es un juego de fiesta para público general y no forma parte del programa Familias de Google Play.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "If you are a parent or guardian and believe a child has given us personal data, write to [{email}](mailto:{email}) and we will delete the account and its data. If you are under the age of majority where you live, use the apps only with the involvement of a parent or guardian.",
						es: "Si eres padre, madre o tutor y crees que un menor nos ha dado datos personales, escribe a [{email}](mailto:{email}) y borraremos la cuenta y sus datos. Si eres menor de edad según tu país, usa las apps solo con la participación de un padre, madre o tutor.",
					},
				},
			],
		},
		{
			id: "retention",
			title: { en: "How long we keep data", es: "Cuánto tiempo conservamos los datos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We keep personal data only as long as we need it for the purpose we collected it for, or as long as the law requires.",
						es: "Conservamos los datos personales solo el tiempo necesario para la finalidad con la que los recopilamos, o el que exija la ley.",
					},
				},
				{
					kind: "table",
					head: [
						{ en: "Data", es: "Datos" },
						{ en: "Retention", es: "Conservación" },
					],
					rows: [
						[
							{
								en: "Account, profile and synced content",
								es: "Cuenta, perfil y contenido sincronizado",
							},
							{
								en: "While the account is active, then deleted within 30 days of a verified deletion request",
								es: "Mientras la cuenta esté activa; después se borran en un plazo de 30 días desde una solicitud verificada",
							},
						],
						[
							{
								en: "Gameplay records, ranks and season progress",
								es: "Registros de juego, rangos y progreso de temporada",
							},
							{
								en: "While the account is active; seasons reset periodically",
								es: "Mientras la cuenta esté activa; las temporadas se reinician periódicamente",
							},
						],
						[
							{ en: "Club and room chat", es: "Chat de clubes y salas" },
							{
								en: "While the club or room exists, or until you delete your account",
								es: "Mientras exista el club o la sala, o hasta que borres tu cuenta",
							},
						],
						[
							{ en: "Crash and diagnostic logs", es: "Registros de fallos y diagnóstico" },
							{ en: "Up to 90 days", es: "Hasta 90 días" },
						],
						[
							{ en: "Contact form messages", es: "Mensajes del formulario de contacto" },
							{ en: "Up to 24 months", es: "Hasta 24 meses" },
						],
						[
							{
								en: "Purchase and transaction records",
								es: "Registros de compras y transacciones",
							},
							{
								en: "As long as tax and accounting law requires (up to 10 years)",
								es: "Mientras lo exija la normativa fiscal y contable (hasta 10 años)",
							},
						],
						[
							{ en: "Server and security logs", es: "Registros de servidor y seguridad" },
							{ en: "Up to 30 days", es: "Hasta 30 días" },
						],
						[
							{ en: "Aggregated statistics", es: "Estadísticas agregadas" },
							{
								en: "Indefinitely, but no longer linked to you",
								es: "Indefinidamente, pero sin vínculo contigo",
							},
						],
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "Backups rotate on a rolling basis, so residual copies disappear within 30 days of deletion.",
						es: "Las copias de seguridad rotan de forma continua, así que las copias residuales desaparecen en un plazo de 30 días tras el borrado.",
					},
				},
			],
		},
		{
			id: "account-deletion",
			title: { en: "Account and data deletion", es: "Eliminación de la cuenta y de los datos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "You can delete your account and the data associated with it at any time, from inside the app or by writing to us. Deletion is free, and you do not have to explain why you want it.",
						es: "Puedes eliminar tu cuenta y los datos asociados en cualquier momento, desde dentro de la app o escribiéndonos. El borrado es gratuito y no tienes que explicar por qué lo quieres.",
					},
				},
				{
					kind: "callout",
					tone: "accent",
					title: { en: "Two ways to request deletion", es: "Dos formas de solicitar el borrado" },
					items: [
						{
							en: "**From the app.** Open the account or profile settings in Stop Trivia or Setuno and choose “Delete account”, then confirm. If you cannot find it in your version, use the email route.",
							es: "**Desde la app.** Abre los ajustes de cuenta o de perfil en Stop Trivia o en Setuno y elige “Eliminar cuenta”, luego confirma. Si no lo encuentras en tu versión, usa la vía del correo.",
						},
						{
							en: "**By email.** Write to [{email}](mailto:{email}) with the subject “Account deletion – Stop Trivia” or “Account deletion – Setuno”. Include the app name and the email address or Google Play Games player ID linked to the account.",
							es: "**Por correo.** Escribe a [{email}](mailto:{email}) con el asunto “Eliminación de cuenta – Stop Trivia” o “Eliminación de cuenta – Setuno”. Incluye el nombre de la app y el correo o el ID de jugador de Google Play Games vinculado a la cuenta.",
						},
						{
							en: "**Partial deletion.** Tell us if you only want a band, a club, a specific song, setlist, gig or chat message removed, and we will remove that item while keeping the account.",
							es: "**Borrado parcial.** Dinos si solo quieres eliminar una banda, un club, una canción, una lista, un bolo o un mensaje de chat concreto, y lo borraremos manteniendo la cuenta.",
						},
					],
				},
				{
					kind: "list",
					ordered: true,
					items: [
						{
							en: "We confirm receipt within **5 business days**.",
							es: "Confirmamos la recepción en un plazo de **5 días hábiles**.",
						},
						{
							en: "We may ask you to verify that the account is yours, either by replying from the registered email address or by signing in. We never ask for your password.",
							es: "Podemos pedirte que verifiques que la cuenta es tuya, respondiendo desde el correo registrado o iniciando sesión. Nunca te pedimos tu contraseña.",
						},
						{
							en: "We complete the deletion within **30 days** and send you a confirmation by email.",
							es: "Completamos el borrado en un plazo de **30 días** y te enviamos una confirmación por correo.",
						},
						{
							en: "If we cannot verify ownership, we explain why and what alternatives you have.",
							es: "Si no podemos verificar la titularidad, te explicamos por qué y qué alternativas tienes.",
						},
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "**What deletion removes:**",
						es: "**Qué elimina el borrado:**",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "Your profile: display name, email address, profile picture and account identifiers.",
							es: "Tu perfil: nombre visible, correo electrónico, foto de perfil e identificadores de cuenta.",
						},
						{
							en: "The content you created: songs, setlists, gigs, comments, suggestions and version history in Setuno; your messages and room history in Stop Trivia.",
							es: "El contenido que creaste: canciones, listas, bolos, comentarios, sugerencias e historial de versiones en Setuno; tus mensajes e historial de salas en Stop Trivia.",
						},
						{
							en: "Gameplay progress: ranks, season pass progress, the achievements we store, in-game items and currency.",
							es: "El progreso de juego: rangos, progreso del pase de temporada, los logros que almacenamos, objetos y moneda del juego.",
						},
						{
							en: "Device and push notification tokens, and the link between your Google Play Games profile and our records.",
							es: "Los tokens de dispositivo y de notificaciones push, y el vínculo entre tu perfil de Google Play Games y nuestros registros.",
						},
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "**What we may keep, and why:**",
						es: "**Qué podemos conservar y por qué:**",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "Purchase and transaction records that tax, accounting and refund rules require us to keep (up to 10 years).",
							es: "Registros de compras y transacciones que las normas fiscales, contables y de reembolso nos obligan a conservar (hasta 10 años).",
						},
						{
							en: "Security and abuse logs, when a violation or an open investigation requires it.",
							es: "Registros de seguridad y abuso, cuando una infracción o una investigación abierta lo requieran.",
						},
						{
							en: "Aggregated or anonymised statistics that can no longer be linked to you.",
							es: "Estadísticas agregadas o anonimizadas que ya no puedan vincularse contigo.",
						},
						{
							en: "Content other people created, or content that belongs to a band you do not administer.",
							es: "Contenido creado por otras personas, o contenido que pertenece a una banda que no administras.",
						},
					],
				},
				{
					kind: "table",
					head: [
						{ en: "Request", es: "Solicitud" },
						{ en: "What happens", es: "Qué ocurre" },
					],
					rows: [
						[
							{ en: "Delete the whole account", es: "Eliminar toda la cuenta" },
							{
								en: "Everything above is deleted and the account can no longer be used",
								es: "Se elimina todo lo anterior y la cuenta deja de poder usarse",
							},
						],
						[
							{ en: "Leave a band in Setuno", es: "Salir de una banda en Setuno" },
							{
								en: "Your membership and personal content are removed; the band and other members’ content stay",
								es: "Se eliminan tu membresía y tu contenido personal; la banda y el contenido de los demás miembros se mantienen",
							},
						],
						[
							{ en: "Delete a band you administer", es: "Eliminar una banda que administras" },
							{
								en: "The band, its songs, setlists and gigs are deleted for every member",
								es: "Se eliminan la banda, sus canciones, listas y bolos para todos los miembros",
							},
						],
						[
							{
								en: "Delete a song, setlist, gig or chat message",
								es: "Eliminar una canción, lista, bolo o mensaje de chat",
							},
							{
								en: "The item and its version history are removed immediately",
								es: "El elemento y su historial de versiones se eliminan de inmediato",
							},
						],
						[
							{ en: "Delete your gallery selection", es: "Eliminar tu selección de la galería" },
							{
								en: "Your selections are deleted from our database; the photos belong to the client and are handled with them",
								es: "Tus selecciones se eliminan de nuestra base de datos; las fotos son del cliente y se gestionan con él",
							},
						],
					],
				},
				{
					kind: "callout",
					tone: "warning",
					title: {
						en: "Deleting the app is not deleting the account",
						es: "Desinstalar la app no es borrar la cuenta",
					},
					items: [
						{
							en: "Uninstalling clears the local cache, but the account and its synced data remain until you request deletion.",
							es: "Desinstalar borra la caché local, pero la cuenta y sus datos sincronizados permanecen hasta que solicites el borrado.",
						},
						{
							en: "Deleting our app data does not delete your Google Account. Achievements and progress linked to Google Play Games stay in your Google account until you remove them in [Play Games settings](https://myaccount.google.com/) or at [myaccount.google.com](https://myaccount.google.com/).",
							es: "Borrar los datos de nuestra app no elimina tu cuenta de Google. Los logros y el progreso vinculados a Google Play Games permanecen en tu cuenta de Google hasta que los elimines en la [configuración de Play Games](https://myaccount.google.com/) o en [myaccount.google.com](https://myaccount.google.com/).",
						},
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "This section describes the right to erasure of Article 17 of the GDPR and the rights granted by Dominican Republic Law 172-13 on Personal Data Protection. We honour deletion requests from any country, and we never charge for them.",
						es: "Esta sección describe el derecho de supresión del artículo 17 del RGPD y los derechos que otorga la Ley 172-13 sobre Protección de Datos Personales de la República Dominicana. Atendemos solicitudes de borrado de cualquier país y nunca cobramos por ellas.",
					},
				},
				{
					kind: "callout",
					tone: "warning",
					title: { en: "Irreversible", es: "Irreversible" },
					text: {
						en: "Once deletion is complete we cannot restore your account, purchases, progress or content. Export anything you need before you confirm.",
						es: "Una vez completado el borrado no podemos restaurar tu cuenta, compras, progreso ni contenido. Exporta lo que necesites antes de confirmar.",
					},
				},
			],
		},
		{
			id: "your-rights",
			title: { en: "Your rights", es: "Tus derechos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "Depending on where you live, you have some or all of the following rights over your personal data.",
						es: "Según dónde vivas, tienes algunos o todos los siguientes derechos sobre tus datos personales.",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "**Access.** A copy of the personal data we hold about you.",
							es: "**Acceso.** Una copia de los datos personales que tenemos sobre ti.",
						},
						{
							en: "**Correction.** Fix inaccurate or incomplete data.",
							es: "**Rectificación.** Corregir datos inexactos o incompletos.",
						},
						{
							en: "**Deletion.** Erase your data, as explained in [Account and data deletion](#account-deletion).",
							es: "**Supresión.** Eliminar tus datos, como se explica en [Eliminación de la cuenta y de los datos](#account-deletion).",
						},
						{
							en: "**Portability.** Receive the content you created in a machine-readable format.",
							es: "**Portabilidad.** Recibir el contenido que creaste en un formato legible por máquina.",
						},
						{
							en: "**Restriction and objection.** Limit or object to certain processing, including profiling, and to direct marketing at any time.",
							es: "**Limitación y oposición.** Limitar u oponerte a determinados tratamientos, incluida la elaboración de perfiles, y a la mercadotecnia directa en cualquier momento.",
						},
						{
							en: "**Withdraw consent.** For advertising, notifications or marketing email, without affecting processing that already happened.",
							es: "**Retirar el consentimiento.** Para publicidad, notificaciones o correo comercial, sin afectar al tratamiento ya realizado.",
						},
						{
							en: "**Non-discrimination.** We will not degrade the service because you exercised a right.",
							es: "**No discriminación.** No empeoraremos el servicio porque ejerzas un derecho.",
						},
						{
							en: "**Complaint.** To your local data protection authority. In the EU and the UK that is your national authority; in the Dominican Republic, the authority designated by Law 172-13.",
							es: "**Reclamación.** Ante tu autoridad de protección de datos. En la UE y el Reino Unido, tu autoridad nacional; en la República Dominicana, la autoridad designada por la Ley 172-13.",
						},
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "Write to [{email}](mailto:{email}) to exercise any right. We reply within 30 days and may ask you to verify your identity first. Requests are free unless they are manifestly unfounded or repetitive.",
						es: "Escribe a [{email}](mailto:{email}) para ejercer cualquier derecho. Respondemos en un plazo de 30 días y podemos pedirte que verifiques tu identidad primero. Las solicitudes son gratuitas salvo que sean manifiestamente infundadas o repetitivas.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "You can also turn off push notifications in your device settings and unsubscribe from marketing email using the link in every message.",
						es: "También puedes desactivar las notificaciones push en los ajustes de tu dispositivo y darte de baja del correo comercial con el enlace de cada mensaje.",
					},
				},
			],
		},
		{
			id: "security",
			title: { en: "How we protect data", es: "Cómo protegemos los datos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We protect data with encryption in transit (HTTPS/TLS), encrypted storage at rest, gallery PINs stored only as HMAC-SHA256 hashes, short-lived administrator sessions, least-privilege access to production systems, and providers that maintain their own security programmes.",
						es: "Protegemos los datos con cifrado en tránsito (HTTPS/TLS), almacenamiento cifrado en reposo, PINs de galería guardados solo como hashes HMAC-SHA256, sesiones de administrador de corta duración, acceso de mínimo privilegio a los sistemas de producción y proveedores que mantienen sus propios programas de seguridad.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "No system is completely secure. If a breach affects your data, we notify you and the relevant authority as the law requires. Protect your account with a unique password and keep your device and apps updated.",
						es: "Ningún sistema es completamente seguro. Si una brecha afecta a tus datos, te avisamos a ti y a la autoridad correspondiente según exige la ley. Protege tu cuenta con una contraseña única y mantén actualizados tu dispositivo y tus apps.",
					},
				},
			],
		},
		{
			id: "international-transfers",
			title: { en: "International transfers", es: "Transferencias internacionales" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "Our providers operate in the United States and the European Union, so your data may be processed outside your country. Where the law requires it, transfers rely on the European Commission’s Standard Contractual Clauses or an equivalent safeguard. You can ask us for more detail about the safeguards that apply to your data.",
						es: "Nuestros proveedores operan en Estados Unidos y en la Unión Europea, por lo que tus datos pueden tratarse fuera de tu país. Cuando la ley lo exige, las transferencias se amparan en las Cláusulas Contractuales Tipo de la Comisión Europea o en una garantía equivalente. Puedes pedirnos más detalle sobre las garantías que se aplican a tus datos.",
					},
				},
			],
		},
		{
			id: "third-party-links",
			title: { en: "Links to other sites", es: "Enlaces a otros sitios" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "The site and the apps link to services we do not control, such as Google Play, YouTube, GitHub, Instagram and WhatsApp. Once you leave our products, their policies apply. We are not responsible for how they handle your data.",
						es: "El sitio y las apps enlazan a servicios que no controlamos, como Google Play, YouTube, GitHub, Instagram y WhatsApp. Cuando sales de nuestros productos se aplican sus políticas. No somos responsables de cómo tratan tus datos.",
					},
				},
			],
		},
		{
			id: "changes",
			title: { en: "Changes to this policy", es: "Cambios en esta política" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We may update this policy when the products change or the law requires it. The date at the top of this page always shows the current version. For significant changes we notify you in the app or by email before they take effect.",
						es: "Podemos actualizar esta política cuando cambien los productos o la ley lo exija. La fecha en la parte superior de esta página muestra siempre la versión vigente. Para cambios importantes te avisamos en la app o por correo antes de que entren en vigor.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Continuing to use the products after a change means you accept the updated policy. If you do not, you can delete your account at any time.",
						es: "Seguir usando los productos después de un cambio significa que aceptas la política actualizada. Si no estás de acuerdo, puedes borrar tu cuenta en cualquier momento.",
					},
				},
			],
		},
		{
			id: "contact",
			title: { en: "Contact us", es: "Contacto" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "**RixelDev** · Rikelvi Capellán García · La Vega, Dominican Republic.",
						es: "**RixelDev** · Rikelvi Capellán García · La Vega, República Dominicana.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Email: [{email}](mailto:{email}) · Contact form: [rixel.dev/#contact](/#contact). We answer privacy questions and deletion requests in English and Spanish, usually within a few days.",
						es: "Correo: [{email}](mailto:{email}) · Formulario de contacto: [rixel.dev/#contact](/#contact). Respondemos preguntas de privacidad y solicitudes de borrado en inglés y español, normalmente en pocos días.",
					},
				},
			],
		},
	],
}
