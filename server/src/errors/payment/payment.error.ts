import { BadRequestException } from '@nestjs/common'

export const PAYMENT_ERROR = {
	CREATE: () => {
		throw new BadRequestException(
			'Произошла ошибка при создании платежа. Пожалуйста, попробуйте позже.'
		)
	},
	ALREADY_PURCHASED: () => {
		throw new BadRequestException(
			'Вы можете активировать только одно объявление в день. Пожалуйста, дождитесь окончания действия текущего.'
		)
	},
}
