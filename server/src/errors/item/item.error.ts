import { BadRequestException, NotFoundException } from '@nestjs/common'

export const ITEM_ERROR = {
	NOT_FOUND: () => {
		throw new NotFoundException(
			'Не удалось найти спецтехнику. Пожалуйста, попробуйте позже.'
		)
	},
	CREATE: () => {
		throw new BadRequestException(
			'Произошла ошибка при создании спецтехники. Пожалуйста, попробуйте позже.'
		)
	},
	UPDATE: () => {
		throw new BadRequestException(
			'Произошла ошибка при обновлении спецтехники. Пожалуйста, попробуйте позже.'
		)
	},
	DELETE: () => {
		throw new BadRequestException(
			'Произошла ошибка при удалении спецтехники. Пожалуйста, попробуйте позже.'
		)
	},
	PROMOTE: () => {
		throw new BadRequestException(
			'Поднятие заказа временно недоступно. Пожалуйста, попробуйте позже.'
		)
	},
}
