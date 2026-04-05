import { Injectable } from '@nestjs/common'
import { ROUTE } from 'src/constants/route/route.constants'
import { PAYMENT_ERROR } from 'src/errors/payment/payment.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as generateUniqueId } from 'uuid'

@Injectable()
export class YookassaService {
	constructor(private readonly prisma: PrismaService) {}

	async getPaymentLink(amount: number, metadata?: object) {
		const paymentData = {
			amount: {
				value: amount.toFixed(2),
				currency: 'RUB',
			},
			payment_method_data: {
				type: 'bank_card',
			},
			confirmation: {
				type: 'redirect',
				return_url: `${process.env.NEXT_APP_URL}/profile`,
			},
			metadata,
		}

		const response = await fetch(ROUTE.YOOKASSA.CREATE_PAYMENT, {
			method: 'POST',
			headers: this.getHeaders(),
			body: JSON.stringify(paymentData),
		})

		const result = await response.json()

		const paymentLink = result?.confirmation?.confirmation_url

		if (!paymentLink) {
			return PAYMENT_ERROR.CREATE()
		}

		return paymentLink
	}

	getHeaders() {
		return {
			'Content-Type': 'application/json',
			'Idempotence-Key': generateUniqueId(),
			Authorization:
				'Basic ' +
				Buffer.from(
					`${process.env.YOOKASSA_SHOP_ID}:${process.env.YOOKASSA_TOKEN}`
				).toString('base64'),
		}
	}
}
