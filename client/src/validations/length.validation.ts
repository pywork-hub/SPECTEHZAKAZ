export const LENGTH_VALIDATION = (
	name: string,
	minLength?: number,
	maxLength?: number,
	isNotRequired?: boolean
) => ({
	...(!isNotRequired && {
		required: `${name} обязательно.`,
	}),
	...(minLength && {
		minLength: {
			value: minLength,
			message: `Минимум ${minLength} символов.`,
		},
	}),
	...(maxLength && {
		maxLength: {
			value: maxLength,
			message: `Максимум ${maxLength} символов.`,
		},
	}),
})
