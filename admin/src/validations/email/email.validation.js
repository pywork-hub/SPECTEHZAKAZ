import { ValidationError } from 'adminjs'
import { validate as isEmailValid } from 'email-validator'

export const emailValidation = email => {
	if (email && !isEmailValid(email)) {
		throw new ValidationError({
			email: {
				message: 'Неверный формат email',
			},
		})
	}
}
