export const NUMBER_VALIDATION = (
	name: string,
	min?: number,
	max?: number
) => ({
	required: `${name} обязательно.`,
	...(min && {
		min: {
			value: min,
			message: `Минимум ${min}.`,
		},
	}),
	...(max && {
		max: {
			value: max,
			message: `Максимум ${max}.`,
		},
	}),
})
