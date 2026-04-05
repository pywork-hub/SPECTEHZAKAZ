export const PHONE_VALIDATION = (name: string, isNotRequired?: boolean) => ({
	...(!isNotRequired && {
		required: `${name} обязательно`,
	}),
	pattern: {
		value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
		message: 'Пожалуйста, введите корректный номер.',
	},
})
