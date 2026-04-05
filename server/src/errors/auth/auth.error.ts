import { BadRequestException, UnauthorizedException } from '@nestjs/common'

export const AUTH_ERROR = {
	UNAUTHORIZED: () => {
		throw new UnauthorizedException('Пожалуйста, войдите в систему.')
	},
	NOT_ENOUGH_RIGHTS: () => {
		throw new UnauthorizedException(
			'У вас недостаточно прав для выполнения этого действия.'
		)
	},
	USER_EXIST_EMAIL: () => {
		throw new BadRequestException(
			'Пользователь с таким E-mail или именем уже существует.'
		)
	},
	USER_EXIST_PHONE: () => {
		throw new BadRequestException(
			'Пользователь с таким номером телефона уже существует'
		)
	},
	REGISTER: () => {
		throw new BadRequestException(
			'Не удалось зарегистрироваться. Пожалуйста, попробуйте позже.'
		)
	},
	LOGIN: () => {
		throw new BadRequestException(
			'Не удалось войти в систему. Пожалуйста, попробуйте позже.'
		)
	},
	LOGOUT: () => {
		throw new BadRequestException(
			'Не удалось выйти из системы. Пожалуйста, попробуйте позже.'
		)
	},
}
