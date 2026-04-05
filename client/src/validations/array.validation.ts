export const ARRAY_VALIDATION = (
	requiredName: string,
	validationName: string,
	min: number,
	max: number
) => ({
	validate: (value: any[]) => {
		if (!value) return `${requiredName} обязательно.`

		if (value.length < min)
			return `Нужно выбрать минимум ${min} ${validationName}.`

		if (value.length > max)
			return `Нужно выбрать максимум ${max} ${validationName}.`

		return true
	},
})
