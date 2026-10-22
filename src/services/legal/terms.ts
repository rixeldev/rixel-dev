import type { LegalDocumentCopy } from "@/interfaces/legal"

export const termsCopy: LegalDocumentCopy = {
	id: "terms",
	title: { en: "Terms & Conditions", es: "Términos y Condiciones" },
	description: {
		en: "The rules for using rixel.dev, the client photo galleries, Stop Trivia and Setuno: accounts, content, purchases, availability and liability.",
		es: "Las reglas para usar rixel.dev, las galerías de fotos de clientes, Stop Trivia y Setuno: cuentas, contenido, compras, disponibilidad y responsabilidad.",
	},
	updated: { en: "October 21, 2026", es: "21 de octubre de 2026" },
	effective: { en: "October 21, 2026", es: "21 de octubre de 2026" },
	intro: [
		{
			en: "These Terms set the rules for using this website, the client photo galleries and our apps. They are written to be understood, and they work together with our Privacy Policy.",
			es: "Estos Términos establecen las reglas para usar este sitio web, las galerías de fotos de clientes y nuestras apps. Están escritos para entenderse y funcionan junto con nuestra Política de Privacidad.",
		},
	],
	summary: [
		{
			en: "Use the services lawfully, keep your account secure and only add content you have the right to use.",
			es: "Usa los servicios de forma lícita, mantén tu cuenta segura y añade solo contenido que tengas derecho a usar.",
		},
		{
			en: "You own your content; you only give us the licence we need to run the features you use.",
			es: "El contenido es tuyo; solo nos das la licencia necesaria para prestar las funciones que usas.",
		},
		{
			en: "Purchases are processed by Google Play, and virtual items have no cash value.",
			es: "Las compras las procesa Google Play y los objetos virtuales no tienen valor en efectivo.",
		},
		{
			en: "The services are provided as available, so back up anything you cannot afford to lose.",
			es: "Los servicios se prestan según disponibilidad, así que haz copia de lo que no puedas permitirte perder.",
		},
	],
	sections: [
		{
			id: "acceptance",
			title: { en: "Acceptance of these terms", es: "Aceptación de estos términos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "By using rixel.dev, the client photo galleries, **Stop Trivia** or **Setuno** (together, “the services”), you agree to these Terms and to our [Privacy Policy](/privacy). If you do not agree, do not use the services.",
						es: "Al usar rixel.dev, las galerías de fotos de clientes, **Stop Trivia** o **Setuno** (en conjunto, “los servicios”), aceptas estos Términos y nuestra [Política de Privacidad](/privacy). Si no estás de acuerdo, no uses los servicios.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "If you use the services on behalf of a band, studio or company, you confirm that you have authority to accept these Terms for it.",
						es: "Si usas los servicios en nombre de una banda, estudio o empresa, confirmas que tienes autoridad para aceptar estos Términos por ella.",
					},
				},
			],
		},
		{
			id: "eligibility",
			title: { en: "Who can use the services", es: "Quién puede usar los servicios" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "You must be at least 13 years old, or 16 in the European Economic Area and the United Kingdom, and old enough in your country to consent to the processing described in our Privacy Policy. If you are below the age of majority where you live, use the services with the involvement of a parent or guardian.",
						es: "Debes tener al menos 13 años, o 16 en el Espacio Económico Europeo y el Reino Unido, y la edad suficiente en tu país para consentir el tratamiento descrito en nuestra Política de Privacidad. Si eres menor de edad según tu país, usa los servicios con la participación de un padre, madre o tutor.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "The services are not part of Google Play’s Families programme, and we do not knowingly allow children to create accounts.",
						es: "Los servicios no forman parte del programa Familias de Google Play y no permitimos a sabiendas que los menores creen cuentas.",
					},
				},
			],
		},
		{
			id: "accounts",
			title: { en: "Your account", es: "Tu cuenta" },
			blocks: [
				{
					kind: "list",
					items: [
						{
							en: "Some features need an account. Provide accurate information and keep it up to date.",
							es: "Algunas funciones requieren una cuenta. Proporciona información veraz y mantenla actualizada.",
						},
						{
							en: "Keep your credentials secret, do not share your account and do not let anyone else use it. One person, one account.",
							es: "Mantén tus credenciales en secreto, no compartas tu cuenta ni dejes que otra persona la use. Una persona, una cuenta.",
						},
						{
							en: "Tell us immediately if you suspect unauthorised access, and change your password.",
							es: "Avísanos de inmediato si sospechas de un acceso no autorizado y cambia tu contraseña.",
						},
						{
							en: "You are responsible for activity carried out with your account, except when it results from our own failure.",
							es: "Eres responsable de la actividad realizada con tu cuenta, salvo cuando sea consecuencia de un fallo nuestro.",
						},
						{
							en: "In Setuno, band administrators control membership, roles and the repertoire. In Stop Trivia, club owners control membership and moderation.",
							es: "En Setuno, los administradores de la banda controlan la membresía, los roles y el repertorio. En Stop Trivia, los dueños de los clubes controlan la membresía y la moderación.",
						},
					],
				},
			],
		},
		{
			id: "license",
			title: { en: "Licence to use the services", es: "Licencia de uso" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We grant you a personal, worldwide, non-exclusive, non-transferable, revocable and limited licence to install and use the apps and to browse the website, for your own non-commercial use, subject to these Terms and to the [Google Play Terms of Service](https://play.google.com/about/play-terms/).",
						es: "Te concedemos una licencia personal, mundial, no exclusiva, no transferible, revocable y limitada para instalar y usar las apps y navegar por el sitio web, para tu uso no comercial, sujeta a estos Términos y a los [Términos de Servicio de Google Play](https://play.google.com/about/play-terms/).",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "You may not:",
						es: "No puedes:",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "Copy, modify, distribute, sell or lease the apps, except as the law expressly allows.",
							es: "Copiar, modificar, distribuir, vender o arrendar las apps, salvo que la ley lo permita expresamente.",
						},
						{
							en: "Reverse engineer, decompile or try to extract the source code, except where that right cannot be excluded.",
							es: "Aplicar ingeniería inversa, descompilar o intentar extraer el código fuente, salvo cuando ese derecho no pueda excluirse.",
						},
						{
							en: "Use bots, emulators, modified clients, scripts or automation to play, scrape or overload the services.",
							es: "Usar bots, emuladores, clientes modificados, scripts o automatización para jugar, extraer datos o sobrecargar los servicios.",
						},
						{
							en: "Bypass purchases, bans, rate limits or any technical protection measure.",
							es: "Eludir compras, bloqueos, límites de uso o cualquier medida técnica de protección.",
						},
						{
							en: "Remove or alter copyright, trademark or attribution notices.",
							es: "Eliminar o alterar avisos de derechos de autor, marcas o atribución.",
						},
					],
				},
			],
		},
		{
			id: "acceptable-use",
			title: { en: "Acceptable use", es: "Uso aceptable" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "The services include spaces shared with other people, such as rooms, clubs and bands. You agree not to:",
						es: "Los servicios incluyen espacios compartidos con otras personas, como salas, clubes y bandas. Te comprometes a no:",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "Break the law or encourage others to break it.",
							es: "Incumplir la ley o animar a otros a incumplirla.",
						},
						{
							en: "Harass, threaten, defame or impersonate anyone, or publish someone else’s private information.",
							es: "Acosar, amenazar, difamar o suplantar a alguien, o publicar información privada de otra persona.",
						},
						{
							en: "Post hateful content, or sexual content involving minors.",
							es: "Publicar contenido de odio, o contenido sexual que involucre a menores.",
						},
						{
							en: "Spam, send unsolicited advertising or use the chat to distribute malware.",
							es: "Enviar spam, publicidad no solicitada o usar el chat para distribuir malware.",
						},
						{
							en: "Cheat, exploit bugs, manipulate leaderboards or trade accounts and in-game items for money.",
							es: "Hacer trampas, explotar errores, manipular clasificaciones o comerciar con cuentas y objetos del juego por dinero.",
						},
						{
							en: "Publish lyrics, chord sheets or other material you do not have the right to use. Setuno is a private workspace for your band, not a platform for distributing copyrighted works.",
							es: "Publicar letras, tablaturas u otro material sobre el que no tengas derechos. Setuno es un espacio privado para tu banda, no una plataforma para distribuir obras protegidas.",
						},
					],
				},
				{
					kind: "paragraph",
					text: {
						en: "We may remove content and restrict or close accounts that break these rules. Where a report is serious we may act immediately; in other cases we give notice and a chance to correct the problem.",
						es: "Podemos retirar contenido y restringir o cerrar cuentas que incumplan estas reglas. Cuando una denuncia es grave podemos actuar de inmediato; en otros casos avisamos y damos la oportunidad de corregir el problema.",
					},
				},
			],
		},
		{
			id: "user-content",
			title: { en: "Your content", es: "Tu contenido" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "You keep ownership of the content you create: songs, lyrics, chord sheets, setlists, gigs, comments, messages and photos you select. To operate the services you grant us a worldwide, non-exclusive, royalty-free licence to store, copy, transmit, display and back up that content, only as needed to provide the features you use.",
						es: "Conservas la titularidad del contenido que creas: canciones, letras, tablaturas, listas, bolos, comentarios, mensajes y fotos que seleccionas. Para operar los servicios nos concedes una licencia mundial, no exclusiva y gratuita para almacenar, copiar, transmitir, mostrar y respaldar ese contenido, solo en la medida necesaria para prestar las funciones que usas.",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "That licence ends when you delete the content or your account, except for backup copies that expire within 30 days and content other people have already copied or that belongs to a shared band.",
							es: "Esa licencia termina cuando borras el contenido o tu cuenta, salvo las copias de seguridad que caducan en 30 días y el contenido que otras personas ya han copiado o que pertenece a una banda compartida.",
						},
						{
							en: "You are responsible for your content and for having the rights to publish it, including the rights to any lyrics or arrangements you enter.",
							es: "Eres responsable de tu contenido y de tener los derechos para publicarlo, incluidos los derechos sobre las letras o arreglos que introduzcas.",
						},
						{
							en: "Band administrators can remove members and content from their band. Club owners can moderate their club.",
							es: "Los administradores de una banda pueden eliminar miembros y contenido de su banda. Los dueños de un club pueden moderarlo.",
						},
						{
							en: "We may remove content that breaks these Terms or the law, and we may suspend accounts that repeatedly infringe intellectual property rights.",
							es: "Podemos retirar contenido que incumpla estos Términos o la ley, y suspender cuentas que infrinjan reiteradamente derechos de propiedad intelectual.",
						},
					],
				},
			],
		},
		{
			id: "purchases",
			title: { en: "Purchases and virtual items", es: "Compras y objetos virtuales" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "Paid features, season passes and virtual items are sold through Google Play and billed by Google. Prices, taxes and refunds follow [Google Play’s refund policy](https://support.google.com/googleplay/answer/2479637); we cannot process refunds directly.",
						es: "Las funciones de pago, los pases de temporada y los objetos virtuales se venden a través de Google Play y los factura Google. Los precios, impuestos y reembolsos siguen la [política de reembolsos de Google Play](https://support.google.com/googleplay/answer/2479637); no podemos procesar reembolsos directamente.",
					},
				},
				{
					kind: "list",
					items: [
						{
							en: "Virtual items and in-game currency are a limited, non-transferable licence to use them inside the app. They have no cash value and cannot be exchanged, sold or transferred.",
							es: "Los objetos virtuales y la moneda del juego son una licencia limitada y no transferible para usarlos dentro de la app. No tienen valor en efectivo y no pueden cambiarse, venderse ni transferirse.",
						},
						{
							en: "We may balance, modify or discontinue virtual items and paid features. If we discontinue something you paid for, we offer a reasonable remedy where the law requires it.",
							es: "Podemos equilibrar, modificar o retirar objetos virtuales y funciones de pago. Si retiramos algo que pagaste, ofrecemos una solución razonable cuando la ley lo exija.",
						},
						{
							en: "Deleting your account, or losing access to it, means losing the virtual items and progress associated with it.",
							es: "Borrar tu cuenta, o perder el acceso a ella, implica perder los objetos virtuales y el progreso asociados.",
						},
						{
							en: "Deleting your account does not cancel an active subscription. Cancel it in Google Play → Payments and subscriptions.",
							es: "Borrar tu cuenta no cancela una suscripción activa. Cancélala en Google Play → Pagos y suscripciones.",
						},
					],
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
						en: "Stop Trivia is supported by ads served through Google AdMob. Ads may be personalised with your consent, as described in our [Privacy Policy](/privacy#advertising). We do not control the products or claims of advertisers and are not responsible for them.",
						es: "Stop Trivia se financia con anuncios servidos a través de Google AdMob. Los anuncios pueden personalizarse con tu consentimiento, como se describe en nuestra [Política de Privacidad](/privacy#advertising). No controlamos los productos ni las afirmaciones de los anunciantes y no somos responsables de ellos.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Setuno and rixel.dev do not display third-party ads.",
						es: "Setuno y rixel.dev no muestran anuncios de terceros.",
					},
				},
			],
		},
		{
			id: "third-parties",
			title: { en: "Third-party services", es: "Servicios de terceros" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "The services depend on Google Play, Firebase, Supabase, Vercel, Resend and similar providers, and they link to external sites. Their own terms and policies apply to their part of the service. We are not responsible for third-party services, and a change to them may affect how our products work.",
						es: "Los servicios dependen de Google Play, Firebase, Supabase, Vercel, Resend y proveedores similares, y enlazan a sitios externos. Sus propios términos y políticas se aplican a su parte del servicio. No somos responsables de los servicios de terceros, y un cambio en ellos puede afectar al funcionamiento de nuestros productos.",
					},
				},
			],
		},
		{
			id: "intellectual-property",
			title: { en: "Intellectual property", es: "Propiedad intelectual" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "The RixelDev and Rilis Entertainment names, the Rixel logo, the design of the apps, their interface, artwork, code and written content belong to us or are licensed to us, and are protected by copyright and trademark law. You may not use them without written permission, except to refer to the services truthfully.",
						es: "Los nombres RixelDev y Rilis Entertainment, el logotipo de Rixel, el diseño de las apps, su interfaz, ilustraciones, código y textos nos pertenecen o están licenciados a nosotros, y están protegidos por derechos de autor y marcas. No puedes usarlos sin autorización escrita, salvo para referirte a los servicios de forma veraz.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "If you send us feedback or suggestions, we may use them without obligation or compensation. If you believe content on the services infringes your rights, write to us with enough detail and we will review it.",
						es: "Si nos envías comentarios o sugerencias, podemos usarlos sin obligación ni compensación. Si crees que un contenido de los servicios infringe tus derechos, escríbenos con el suficiente detalle y lo revisaremos.",
					},
				},
			],
		},
		{
			id: "availability",
			title: {
				en: "Availability and changes to the services",
				es: "Disponibilidad y cambios en los servicios",
			},
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "The services are provided as available. We may change, update, limit, suspend or discontinue features, supported devices and platforms, and we may interrupt the service for maintenance. We do not guarantee that every feature will always exist or work on every device.",
						es: "Los servicios se prestan según disponibilidad. Podemos cambiar, actualizar, limitar, suspender o retirar funciones, dispositivos y plataformas compatibles, e interrumpir el servicio por mantenimiento. No garantizamos que cada función exista siempre ni que funcione en todos los dispositivos.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Some features need a connection. Offline changes sync when the connection returns, and conflicting edits may need your review before they are merged.",
						es: "Algunas funciones necesitan conexión. Los cambios sin conexión se sincronizan cuando vuelve la conexión, y las ediciones en conflicto pueden requerir tu revisión antes de combinarse.",
					},
				},
			],
		},
		{
			id: "beta",
			title: { en: "Beta features", es: "Funciones en fase beta" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "Features marked as beta or preview may change or disappear, may contain errors and receive less support. Do not rely on them for critical information: keep a backup of any setlist you need on stage.",
						es: "Las funciones marcadas como beta o de vista previa pueden cambiar o desaparecer, contener errores y recibir menos soporte. No dependas de ellas para información crítica: guarda una copia de cualquier lista que necesites en el escenario.",
					},
				},
			],
		},
		{
			id: "disclaimers",
			title: { en: "Disclaimers", es: "Exenciones de responsabilidad" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "To the maximum extent permitted by law, the services are provided “as is” and “as available”, without warranties of merchantability, fitness for a particular purpose, accuracy or non-infringement. We do not warrant that the services will be uninterrupted or error-free, or that data will never be lost. Back up important content.",
						es: "En la máxima medida permitida por la ley, los servicios se prestan “tal cual” y “según disponibilidad”, sin garantías de comerciabilidad, idoneidad para un fin concreto, exactitud ni no infracción. No garantizamos que los servicios sean ininterrumpidos o estén libres de errores, ni que los datos nunca se pierdan. Haz copia de seguridad del contenido importante.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Nothing in these Terms excludes rights you have as a consumer that cannot be excluded by law.",
						es: "Nada en estos Términos excluye los derechos que tienes como consumidor y que la ley no permite excluir.",
					},
				},
			],
		},
		{
			id: "liability",
			title: { en: "Limitation of liability", es: "Limitación de responsabilidad" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential or punitive damages, nor for lost profits, revenue, data, goodwill or business opportunities. Our total liability for any claim relating to the services is limited to the greater of the amount you paid us in the twelve months before the claim or USD 50.",
						es: "En la máxima medida permitida por la ley, no somos responsables de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de la pérdida de beneficios, ingresos, datos, fondo de comercio u oportunidades de negocio. Nuestra responsabilidad total por cualquier reclamación relacionada con los servicios se limita al mayor de estos importes: lo que nos pagaste en los doce meses anteriores a la reclamación o 50 USD.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Nothing in this section limits liability for fraud, wilful misconduct, death or personal injury caused by negligence, or any other liability that cannot be limited by law.",
						es: "Nada en esta sección limita la responsabilidad por dolo, mala conducta intencional, muerte o daños personales causados por negligencia, ni cualquier otra responsabilidad que no pueda limitarse por ley.",
					},
				},
			],
		},
		{
			id: "indemnity",
			title: { en: "Indemnity", es: "Indemnización" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "You agree to indemnify us against claims, damages and reasonable legal costs arising from your content, from your use of the services in breach of these Terms, or from your infringement of someone else’s rights. We will tell you about the claim and let you take part in the defence.",
						es: "Aceptas indemnizarnos frente a reclamaciones, daños y costes legales razonables derivados de tu contenido, de tu uso de los servicios en incumplimiento de estos Términos o de la infracción de derechos de terceros. Te informaremos de la reclamación y te permitiremos participar en la defensa.",
					},
				},
			],
		},
		{
			id: "termination",
			title: { en: "Suspension and termination", es: "Suspensión y terminación" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "You can stop using the services and delete your account at any time. We may suspend or terminate your access if you seriously or repeatedly break these Terms, if we must for legal or security reasons, or if we discontinue a service.",
						es: "Puedes dejar de usar los servicios y borrar tu cuenta en cualquier momento. Podemos suspender o terminar tu acceso si incumples estos Términos de forma grave o reiterada, si debemos hacerlo por razones legales o de seguridad, o si retiramos un servicio.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Where reasonable we give notice and a chance to export your content, unless the violation requires immediate action. Sections that by their nature survive termination, such as intellectual property, disclaimers, liability, indemnity and governing law, remain in force. Deletion is described in [Account and data deletion](/privacy#account-deletion).",
						es: "Cuando sea razonable, avisamos y damos la oportunidad de exportar tu contenido, salvo que la infracción exija actuar de inmediato. Las secciones que por su naturaleza sobreviven a la terminación, como propiedad intelectual, exenciones, responsabilidad, indemnización y ley aplicable, siguen vigentes. El borrado se describe en [Eliminación de la cuenta y de los datos](/privacy#account-deletion).",
					},
				},
			],
		},
		{
			id: "governing-law",
			title: { en: "Governing law and disputes", es: "Ley aplicable y disputas" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "These Terms are governed by the laws of the Dominican Republic. Disputes will be heard by the courts of the Dominican Republic, unless mandatory consumer law in your country of residence lets you sue in your local courts.",
						es: "Estos Términos se rigen por las leyes de la República Dominicana. Las disputas las conocerán los tribunales de la República Dominicana, salvo que la normativa imperativa de consumo de tu país de residencia te permita acudir a tus tribunales locales.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "Before going to court, write to us: most issues are solved faster that way. Consumers in the European Union and the United Kingdom keep all mandatory protections and may use their local dispute mechanisms.",
						es: "Antes de acudir a los tribunales, escríbenos: la mayoría de los problemas se resuelven más rápido así. Los consumidores de la Unión Europea y del Reino Unido conservan todas las protecciones imperativas y pueden usar los mecanismos de resolución de disputas de su país.",
					},
				},
			],
		},
		{
			id: "changes",
			title: { en: "Changes to these terms", es: "Cambios en estos términos" },
			blocks: [
				{
					kind: "paragraph",
					text: {
						en: "We may update these Terms. The date at the top of this page shows the current version. For material changes we notify you in the app or by email before they take effect.",
						es: "Podemos actualizar estos Términos. La fecha en la parte superior de esta página muestra la versión vigente. Para cambios importantes te avisamos en la app o por correo antes de que entren en vigor.",
					},
				},
				{
					kind: "paragraph",
					text: {
						en: "If you do not accept a change, stop using the services and delete your account. Continuing to use them means you accept the new Terms.",
						es: "Si no aceptas un cambio, deja de usar los servicios y borra tu cuenta. Seguir usándolos significa que aceptas los nuevos Términos.",
					},
				},
			],
		},
		{
			id: "general",
			title: { en: "General provisions", es: "Disposiciones generales" },
			blocks: [
				{
					kind: "list",
					items: [
						{
							en: "**Severability.** If a provision is unenforceable, the rest stays in force and that provision is replaced by the closest enforceable rule.",
							es: "**Divisibilidad.** Si una disposición no es exigible, el resto sigue vigente y esa disposición se sustituye por la norma exigible más cercana.",
						},
						{
							en: "**No waiver.** Not enforcing a right does not mean we waive it.",
							es: "**No renuncia.** No ejercer un derecho no significa renunciar a él.",
						},
						{
							en: "**Assignment.** You may not assign these Terms without our consent. We may assign them as part of a merger, acquisition or sale of assets.",
							es: "**Cesión.** No puedes ceder estos Términos sin nuestro consentimiento. Nosotros podemos cederlos en una fusión, adquisición o venta de activos.",
						},
						{
							en: "**Entire agreement.** These Terms, the Privacy Policy and the Google Play terms are the whole agreement between us, and replace any previous understanding.",
							es: "**Acuerdo completo.** Estos Términos, la Política de Privacidad y los términos de Google Play constituyen el acuerdo completo entre las partes y sustituyen cualquier entendimiento anterior.",
						},
						{
							en: "**No agency.** Nothing here creates a partnership, agency or employment relationship between us.",
							es: "**Sin representación.** Nada aquí crea una sociedad, agencia o relación laboral entre las partes.",
						},
						{
							en: "**Force majeure.** We are not liable for delays caused by events beyond our reasonable control.",
							es: "**Fuerza mayor.** No somos responsables de retrasos causados por hechos fuera de nuestro control razonable.",
						},
						{
							en: "**Language.** Both language versions are provided. If they conflict, the Spanish version prevails, because the governing law is that of the Dominican Republic.",
							es: "**Idioma.** Se ofrecen ambas versiones. Si hay conflicto entre ellas, prevalece la versión en español, porque la ley aplicable es la de la República Dominicana.",
						},
					],
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
						en: "Email: [{email}](mailto:{email}) · Contact form: [rixel.dev/#contact](/#contact). We answer in English and Spanish.",
						es: "Correo: [{email}](mailto:{email}) · Formulario de contacto: [rixel.dev/#contact](/#contact). Respondemos en inglés y en español.",
					},
				},
			],
		},
	],
}
