import { ValidationError } from 'adminjs'

export const phoneValidation = phone => {
	const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/

	if (phone && !phoneRegex.test(phone)) {
		throw new ValidationError({
			phone: {
				message: 'Телефон должен быть в формате +7 (000) 000-00-00',
			},
		})
	}
}
