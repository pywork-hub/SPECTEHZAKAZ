import { emailRegex } from '@/utils/regex/email.regex'

export const EMAIL_VALIDATION = () => ({
	required: 'E-mail обязательно.',
	pattern: {
		value: emailRegex,
		message: 'Пожалуйста, введите корректный E-mail.',
	},
})
