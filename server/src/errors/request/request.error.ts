import { BadRequestException, NotFoundException } from '@nestjs/common'

export const REQUEST_ERROR = {
	NOT_FOUND: () => {
		throw new NotFoundException(
			'Не удалось найти заказ. Пожалуйста, попробуйте позже.'
		)
	},
	CREATE: () => {
		throw new BadRequestException(
			'Произошла ошибка при создании заказа. Пожалуйста, попробуйте позже.'
		)
	},
	UPDATE: () => {
		throw new BadRequestException(
			'Произошла ошибка при обновлении заказа. Пожалуйста, попробуйте позже.'
		)
	},
	DELETE: () => {
		throw new BadRequestException(
			'Произошла ошибка при удалении заказа. Пожалуйста, попробуйте позже.'
		)
	},
	PROMOTE: () => {
		throw new BadRequestException(
			'Поднятие заказа временно недоступно. Пожалуйста, попробуйте позже.'
		)
	},
}
