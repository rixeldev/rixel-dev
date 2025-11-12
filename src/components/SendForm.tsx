import { getI18N, normalizeLocale } from '@/languages/index'
import { useEmail } from '@/hooks/useEmail'
import { useMemo, useRef } from 'react'
import { Loading } from '@/icons/Loading'

interface SendFormProps {
	locale?: string
}

export const SendForm = ({ locale = 'en' }: SendFormProps) => {
	const { sending, sendEmail } = useEmail()
	const formRef = useRef<HTMLFormElement | null>(null)
	const normalizedLocale = normalizeLocale(locale)
	const i18n = useMemo(
		() => getI18N({ currentLocale: normalizedLocale }),
		[normalizedLocale]
	)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (sending) return

		const { elements } = event.currentTarget
		const userNameInput = elements.namedItem('user_name') as HTMLInputElement
		const userEmailInput = elements.namedItem('user_email') as HTMLInputElement
		const messageInput = elements.namedItem('message') as HTMLInputElement

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
			className='flex-1 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 dark:from-primary/10 dark:to-primary/5 sm:w-full sm:p-8'
		>
			<span className='text-sm font-light italic text-secondary/80'>
				{i18n.CONTACT_TXT_6}
			</span>

			<div className='mt-4 flex flex-col gap-4'>
				<label className='inline-flex flex-col gap-2'>
					<span className='text-sm font-medium text-primary'>{i18n.NAME}*</span>
					<input
						required
						autoComplete='name'
						className='h-11 rounded-xl bg-white/50 px-4 py-2 text-primary outline-none transition-all duration-300 placeholder:text-secondary/60 focus:bg-white/80 focus:shadow-md focus:shadow-accent/10 dark:bg-slate-800/50 dark:focus:bg-slate-800/80'
						type='text'
						name='user_name'
						placeholder={i18n.CONTACT_NAME_PLACEHOLDER ?? 'Jane Doe'}
					/>
				</label>

				<label className='inline-flex flex-col gap-2'>
					<span className='text-sm font-medium text-primary'>{i18n.EMAIL}*</span>
					<input
						required
						autoComplete='email'
						className='h-11 rounded-xl bg-white/50 px-4 py-2 text-primary outline-none transition-all duration-300 placeholder:text-secondary/60 focus:bg-white/80 focus:shadow-md focus:shadow-accent/10 dark:bg-slate-800/50 dark:focus:bg-slate-800/80'
						type='email'
						name='user_email'
						placeholder={i18n.CONTACT_EMAIL_PLACEHOLDER ?? 'your@email.com'}
					/>
				</label>

				<label className='inline-flex flex-col gap-2'>
					<span className='text-sm font-medium text-primary'>{i18n.MESSAGE}*</span>
					<textarea
						required
						className='min-h-32 rounded-xl bg-white/50 px-4 py-3 text-primary outline-none transition-all duration-300 placeholder:text-secondary/60 focus:bg-white/80 focus:shadow-md focus:shadow-accent/10 dark:bg-slate-800/50 dark:focus:bg-slate-800/80'
						name='message'
						placeholder={i18n.MESSAGE_PLACEHOLDER}
					></textarea>
				</label>
			</div>

			<button
				type='submit'
				{...(!sending ? {} : { disabled: true })}
				className={`mt-6 flex w-full flex-row items-center justify-center gap-2 rounded-xl px-4 py-3 text-lg font-bold transition-all duration-300 ${
					!sending
						? 'cursor-pointer bg-gradient-to-r from-accent to-accent/90 text-white shadow-md shadow-accent/20 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/30 active:scale-[0.98]'
						: 'cursor-not-allowed bg-gradient-to-r from-main/50 to-main/40 text-secondary shadow-sm'
				}`}
			>
				{!sending ? (
					<svg
						className='size-5'
						width='800px'
						height='800px'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
						<path d='M10 14l11 -11'></path>
						<path d='M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5'></path>
					</svg>
				) : (
					<Loading classes='size-5' />
				)}
				{i18n.SEND}
			</button>
		</form>
	)
}
