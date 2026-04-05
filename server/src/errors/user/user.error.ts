import { BadRequestException, NotFoundException } from '@nestjs/common'

export const USER_ERROR = {
	NOT_FOUND: () => {
		throw new NotFoundException('Пользователь не найден.')
	},
	PROFILE_UPDATE: () => {
		throw new BadRequestException(
			'Ошибка при обновлении профиля. Пожалуйста, попробуйте позже.'
		)
	},
	INVALID_OLD_PASSWORD: () => {
		throw new BadRequestException(
			'Старый пароль указан неверно. Пожалуйста, попробуйте снова.'
		)
	},
	CONFIRM_PASSWORD: () => {
		throw new BadRequestException('Пароли не совпадают.')
	},
}
