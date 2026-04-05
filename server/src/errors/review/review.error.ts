import { BadRequestException } from '@nestjs/common'
import { Status } from '@prisma/client'

export const REVIEW_ERROR = {
	ALREADY_RATED: (status: Status) => {
		throw new BadRequestException(
			`Вы уже оставили отзыв для этой спецтехники. ${
				status === Status.UNDER_REVIEW
					? 'В данный момент он находится на проверке у модератора.'
					: 'Повторный отзыв не возможен.'
			}`
		)
	},
	LEAVE: () => {
		throw new BadRequestException(
			'Произошла ошибка при создании отзыва. Пожалуйста, попробуйте позже.'
		)
	},
}
