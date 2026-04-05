import { Injectable } from '@nestjs/common'
import { PAYMENT_METHOD_LABEL } from 'src/constants/payment-methods/payment-methods.base'
import { PRICING_TYPE_LABEL } from 'src/constants/pricing-types/pricing-types.base'
import { PAYMENT_ERROR } from 'src/errors/payment/payment.error'
import { REQUEST_ERROR } from 'src/errors/request/request.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { PaymentMethod } from 'src/shared/enums/payment-method/payment-method.enum'
import { PricingType } from 'src/shared/enums/pricing-type/pricing-type.enum'
import { Status } from 'src/shared/enums/status/status.enum'
import { formatDate } from 'src/utils/formats/format-date.util'
import { convertToDate } from 'src/utils/helpers/convert-to-date.util'
import type { Context } from 'telegraf'
import { FilterService } from '../filter/filter.service'
import type { PaginationInput } from '../pagination/input/pagination.input'
import { PaginationService } from '../pagination/pagination.service'
import { YookassaService } from '../payment/yookassa/yookassa.service'
import { TelegramService } from '../telegram/telegram.service'
import type { RequestsFiltersInput } from './inputs/filters/requests-filters.input'
import type { RequestUpsertInput } from './inputs/upsert/request-upsert.input'
import { PROFILE_REQUEST_SELECT } from './selects/profile-request/profile-request.select'
import { REQUEST_FOR_EDIT_SELECT } from './selects/request-for-edit/request-for-edit.select'
import { REQUEST_SELECT } from './selects/request/request.select'

@Injectable()
export class RequestService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
		private readonly filterService: FilterService,
		private readonly yookassaService: YookassaService,
		private readonly telegramService: TelegramService
	) {}

	async getRequests(filters: RequestsFiltersInput) {
		const pagination = this.paginationService.getPagination(filters.pagination)

		const where = this.filterService.getRequestsFilters(filters)

		const requests = await this.prisma.request.findMany({
			where: {
				...where,
				status: Status.PUBLISHED,
			},
			orderBy: [
				{
					promotionExpiredAt: {
						sort: 'desc',
						nulls: 'last',
					},
				},
				{
					createdAt: 'desc',
				},
			],
			select: REQUEST_SELECT,
			...pagination,
		})

		const count = await this.prisma.request.count({
			where: {
				...where,
				status: Status.PUBLISHED,
			},
		})

		return {
			requests: requests.map((request) => ({
				...request,
				region: request.region.name,
				createdAt: request.createdAt,
				startAt: formatDate(request.startAt, 'full'),
			})),
			pages: Math.ceil(count / filters.pagination.take),
		}
	}

	async getProfileRequests(input: PaginationInput, userId: number) {
		const pagination = this.paginationService.getPagination(input)

		const requests = await this.prisma.request.findMany({
			where: {
				userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: PROFILE_REQUEST_SELECT,
			...pagination,
		})

		const count = await this.prisma.request.count()

		return {
			requests: requests.map((request) => ({
				...request,
				region: request.region.name,
				createdAt: request.createdAt,
				startAt: formatDate(request.startAt, 'full'),
			})),
			pages: Math.ceil(count / input.take),
		}
	}

	async getRequestForEdit(userId: number, requestId?: number) {
		const [allRegions, allCategories] = await Promise.all([
			this.prisma.region.findMany({
				select: {
					id: true,
					name: true,
				},
			}),
			this.prisma.category.findMany({
				select: {
					id: true,
					name: true,
				},
			}),
		])

		const regions = allRegions.map((region) => ({
			label: region.name,
			value: region.id,
		}))

		const categories = allCategories.map((category) => ({
			label: category.name,
			value: category.id,
		}))

		if (!requestId) {
			return {
				categories,
				regions,
			}
		}

		const request = await this.prisma.request.findUnique({
			where: {
				id: requestId,
				userId,
			},
			select: REQUEST_FOR_EDIT_SELECT,
		})

		if (!request) {
			return REQUEST_ERROR.NOT_FOUND()
		}

		return {
			request: {
				...request,
				paymentMethod: {
					label: PAYMENT_METHOD_LABEL[request.paymentMethod],
					value: request.paymentMethod,
				},
				pricingType: {
					label: PRICING_TYPE_LABEL[request.pricingType],
					value: request.pricingType,
				},
				region: {
					label: request.region.name,
					value: request.region.id,
				},
				category: {
					label: request.category.name,
					value: request.category.id,
				},
				startAt: formatDate(request.startAt, 'normal'),
			},
			categories,
			regions,
		}
	}

	async promoteRequest(userId: number, requestId: number) {
		const now = new Date()

		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				items: {
					where: {
						promotionExpiredAt: {
							gt: now,
						},
					},
					select: { id: true },
				},
				requests: {
					where: {
						promotionExpiredAt: {
							gt: now,
						},
					},
					select: { id: true },
				},
			},
		})

		const isAlreadyPromoted =
			(user.items && user.items.length > 0) ||
			(user.requests && user.requests.length > 0)

		if (isAlreadyPromoted) {
			return PAYMENT_ERROR.ALREADY_PURCHASED()
		}

		try {
			await this.prisma.request.update({
				where: {
					id: requestId,
					userId,
				},
				data: {
					promotionExpiredAt: new Date(
						new Date().setDate(new Date().getDate() + 1)
					).toISOString(),
				},
			})

			return true
		} catch {
			return REQUEST_ERROR.PROMOTE()
		}
	}

	async upsertRequest(
		input: RequestUpsertInput,
		userId: number,
		requestId?: number
	) {
		const data = {
			region: { connect: { id: Number(input.region.value) } },
			description: input.description,
			phone: input.phone,
			pricingType: input.pricingType.value as PricingType,
			paymentMethod: input.paymentMethod.value as PaymentMethod,
			quantity: Number(input.quantity),
			startAt: convertToDate(input.startAt),
			category: { connect: { id: Number(input.category.value) } },
			user: { connect: { id: userId } },
			status: Status.UNDER_REVIEW,
			...(input.price !== null && {
				price: Number(input.price),
			}),
		}

		try {
			if (!requestId) {
				await this.prisma.$transaction(async (transaction) => {
					const createdRequest = await transaction.request.create({
						data,
						select: {
							id: true,
							description: true,
							phone: true,
							price: true,
							pricingType: true,
							paymentMethod: true,
							quantity: true,
							startAt: true,
							createdAt: true,
							region: {
								select: {
									name: true,
								},
							},
							category: {
								select: {
									name: true,
								},
							},
							user: {
								select: {
									name: true,
								},
							},
						},
					})

					const message = `
<b>🛠️ Создание заказа</b>

<b>ID:</b> ${createdRequest.id}
<b>Пользователь:</b> ${createdRequest.user.name}
<b>Номер Телефона:</b> ${createdRequest.phone}
<b>Регион:</b> ${createdRequest.region.name}

<b>Способ оплаты:</b> ${PAYMENT_METHOD_LABEL[createdRequest.paymentMethod]}
<b>Тип оплаты:</b> ${PRICING_TYPE_LABEL[createdRequest.pricingType]}
<b>Цена за час:</b> ${
						createdRequest.price
							? `${createdRequest.price} ₽`
							: 'Запрос расценки'
					}

<b>Количество:</b> ${createdRequest.quantity}
<b>Категория:</b> ${createdRequest.category.name}

<b>Описание:</b> ${createdRequest.description}
    
<b>Дата начала:</b> ${new Date(createdRequest.startAt).toLocaleDateString(
						'ru-RU'
					)}
<b>Дата создания:</b> ${new Date(createdRequest.createdAt).toLocaleDateString(
						'ru-RU'
					)}
`

					const keyboards = [
						{
							text: 'Подтвердить',
							callback_data: `approve_request_create_${createdRequest.id}`,
						},
						{
							text: 'Отклонить',
							callback_data: `reject_request_create_${createdRequest.id}`,
						},
					]

					await this.telegramService.sendMessage(message, keyboards)
				})
			} else {
				await this.prisma.$transaction(async (transaction) => {
					const updatedRequest = await transaction.request.update({
						where: { id: requestId },
						data,
						select: {
							id: true,
							description: true,
							phone: true,
							price: true,
							pricingType: true,
							paymentMethod: true,
							quantity: true,
							startAt: true,
							createdAt: true,
							region: {
								select: {
									name: true,
								},
							},
							category: {
								select: {
									name: true,
								},
							},
							user: {
								select: {
									name: true,
								},
							},
						},
					})

					const message = `
<b>🛠️ Обновление заказа</b>

<b>ID:</b> ${updatedRequest.id}
<b>Пользователь:</b> ${updatedRequest.user.name}
<b>Номер Телефона:</b> ${updatedRequest.phone}
<b>Регион:</b> ${updatedRequest.region.name}

<b>Способ оплаты:</b> ${PAYMENT_METHOD_LABEL[updatedRequest.paymentMethod]}
<b>Тип оплаты:</b> ${PRICING_TYPE_LABEL[updatedRequest.pricingType]}
<b>Цена за час:</b> ${
						updatedRequest.price
							? `${updatedRequest.price} ₽`
							: 'Запрос расценки'
					}

<b>Количество:</b> ${updatedRequest.quantity}
<b>Категория:</b> ${updatedRequest.category.name}

<b>Описание:</b> ${updatedRequest.description}
    
<b>Дата начала:</b> ${new Date(updatedRequest.startAt).toLocaleDateString(
						'ru-RU'
					)}
<b>Дата создания:</b> ${new Date(updatedRequest.createdAt).toLocaleDateString(
						'ru-RU'
					)}
`

					const keyboards = [
						{
							text: 'Подтвердить',
							callback_data: `approve_request_update_${updatedRequest.id}`,
						},
						{
							text: 'Отклонить',
							callback_data: `reject_request_update_${updatedRequest.id}`,
						},
					]

					await this.telegramService.sendMessage(message, keyboards)
				})
			}

			return true
		} catch (error) {
			return !requestId ? REQUEST_ERROR.CREATE() : REQUEST_ERROR.UPDATE()
		}
	}

	async deleteRequest(userId: number, requestId: number) {
		try {
			await this.prisma.request.delete({
				where: {
					id: requestId,
					userId,
				},
			})

			return true
		} catch {
			return REQUEST_ERROR.DELETE()
		}
	}

	async changeRequestStatus(id: number, status: Status, context: Context) {
		try {
			const request = await this.prisma.request.update({
				where: { id },
				data: { status },
				select: { id: true },
			})

			await context.answerCbQuery()

			const statusMessage =
				status === Status.PUBLISHED
					? `<b>ID: ${request.id}</b> - Заказ успешно опубликован.`
					: `<b>ID: ${request.id}</b> - Заказ успешно отклонен.`

			await this.telegramService.sendMessage(statusMessage, [])
		} catch (error) {
			await context.answerCbQuery()
			await this.telegramService.sendMessage(
				'Произошла ошибка при обновлении статуса заказа. Пожалуйста, попробуйте позже.',
				[]
			)
		}
	}
}
