import { getI18N, normalizeLocale } from "@/locales/index"
import { useEmail } from "@/hooks/useEmail"
import { useMemo, useRef } from "react"
import { Loading } from "@/icons/Loading"

interface SendFormProps {
	locale?: string
}

export const SendForm = ({ locale = "en" }: SendFormProps) => {
	const { sending, sendEmail } = useEmail()
	const formRef = useRef<HTMLFormElement | null>(null)
	const normalizedLocale = normalizeLocale(locale)
	const i18n = useMemo(() => getI18N({ currentLocale: normalizedLocale }), [normalizedLocale])

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (sending) return

		const { elements } = event.currentTarget
		const userNameInput = elements.namedItem("user_name") as HTMLInputElement
		const userEmailInput = elements.namedItem("user_email") as HTMLInputElement
		const messageInput = elements.namedItem("message") as HTMLInputElement

		sendEmail(
			{
				user_name: userNameInput.value,
				user_email: userEmailInput.value,
				message: messageInput.value,
			},
			normalizedLocale,
			() => {
				if (formRef.current) {
					formRef.current.reset()
				}
			}
		)
	}

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className="flex-1 rounded-4xl border border-line bg-ink-panel p-6 sm:p-8"
		>
			<span className="font-mono text-xs uppercase tracking-wider text-secondary">
				{i18n.CONTACT_TXT_6}
			</span>

			<div className="mt-6 flex flex-col gap-4">
				<label className="inline-flex flex-col gap-2">
					<span className="font-mono text-xs uppercase tracking-wider text-secondary">
						{i18n.NAME}*
					</span>
					<input
						required
						autoComplete="name"
						className="h-11 w-full rounded-xl border border-line bg-ink/60 px-4 py-2 text-sm text-bone outline-none transition-colors placeholder:text-secondary/70 focus:border-accent/60"
						type="text"
						name="user_name"
						placeholder={i18n.CONTACT_NAME_PLACEHOLDER ?? "Jane Doe"}
					/>
				</label>

				<label className="inline-flex flex-col gap-2">
					<span className="font-mono text-xs uppercase tracking-wider text-secondary">
						{i18n.EMAIL}*
					</span>
					<input
						required
						autoComplete="email"
						className="h-11 w-full rounded-xl border border-line bg-ink/60 px-4 py-2 text-sm text-bone outline-none transition-colors placeholder:text-secondary/70 focus:border-accent/60"
						type="email"
						name="user_email"
						placeholder={i18n.CONTACT_EMAIL_PLACEHOLDER ?? "your@email.com"}
					/>
				</label>

				<label className="inline-flex flex-col gap-2">
					<span className="font-mono text-xs uppercase tracking-wider text-secondary">
						{i18n.MESSAGE}*
					</span>
					<textarea
						required
						className="min-h-32 w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-bone outline-none transition-colors placeholder:text-secondary/70 focus:border-accent/60"
						name="message"
						placeholder={i18n.MESSAGE_PLACEHOLDER}
					></textarea>
				</label>
			</div>

			<button
				type="submit"
				{...(!sending ? {} : { disabled: true })}
				className={`mt-6 flex w-full flex-row items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
					!sending
						? "cursor-pointer bg-accent text-accent-ink hover:bg-accent-soft active:scale-95"
						: "cursor-not-allowed border border-line bg-ink/60 text-secondary"
				}`}
			>
				{!sending ? (
					<svg
						className="size-4"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<path d="M10 14l11 -11"></path>
						<path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
					</svg>
				) : (
					<Loading classes="size-4" />
				)}
				{i18n.SEND}
			</button>
		</form>
	)
}
