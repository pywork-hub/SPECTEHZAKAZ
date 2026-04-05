import { Injectable } from '@nestjs/common'
import { ITEM_ERROR } from 'src/errors/item/item.error'
import { PAYMENT_ERROR } from 'src/errors/payment/payment.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { Status } from 'src/shared/enums/status/status.enum'
import { formatDate } from 'src/utils/formats/format-date.util'
import { generateSlug } from 'src/utils/helpers/generate-slug.util'
import type { Context } from 'telegraf'
import { FilterService } from '../filter/filter.service'
import type { PaginationInput } from '../pagination/input/pagination.input'
import { PaginationService } from '../pagination/pagination.service'
import { YookassaService } from '../payment/yookassa/yookassa.service'
import { TelegramService } from '../telegram/telegram.service'
import type { ItemsFiltersInput } from './inputs/filters/items-filters.input'
import type { ItemUpsertInput } from './inputs/upsert/item-upsert.input'
import { CURRENT_ITEM_SELECT } from './selects/current-item/current-item.select'
import { ITEM_FOR_EDIT_SELECT } from './selects/item-for-edit/item-for-edit.select'
import { ITEM_SELECT } from './selects/item/item.select'
import { PROFILE_ITEM_SELECT } from './selects/profile-item/profile-item.select'

@Injectable()
export class ItemService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService,
		private readonly filterService: FilterService,
		private readonly yookassaService: YookassaService,
		private readonly telegramService: TelegramService
	) {}

	async getItems(filters: ItemsFiltersInput) {
		const pagination = this.paginationService.getPagination(filters.pagination)

		const { where, orderBy } = this.filterService.getItemsFilters(filters)

		const items = await this.prisma.item.findMany({
			where: {
				...where,
				status: Status.PUBLISHED,
			},
			orderBy,
			select: ITEM_SELECT,
			...pagination,
		})

		const count = await this.prisma.item.count({
			where: {
				...where,
				status: Status.PUBLISHED,
			},
		})

		return {
			items: items.map((item) => ({
				...item,
				imagePaths: item.imagePaths.slice(0, 5),
				imagesCount: item.imagePaths.length,
				reviewsCount: item._count.reviews,
				createdAt: item.createdAt,
				user: {
					...item.user,
					itemsCount: item.user._count.items,
					createdAt: formatDate(item.user.createdAt, 'full'),
				},
			})),
			pages: Math.ceil(count / filters.pagination.take),
		}
	}

	async getCurrentItem(id: number) {
		const item = await this.prisma.item.findUnique({
			where: {
				id,
				status: Status.PUBLISHED,
			},
			select: CURRENT_ITEM_SELECT,
		})

		if (!item) {
			return ITEM_ERROR.NOT_FOUND()
		}

		return {
			...item,
			imagePaths: item.imagePaths.slice(0, 5),
			reviewsCount: item._count.reviews,
			user: {
				...item.user,
				itemsCount: item.user._count.items,
				createdAt: formatDate(item.user.createdAt, 'full'),
			},
		}
	}

	async getProfileItems(input: PaginationInput, userId: number) {
		const pagination = this.paginationService.getPagination(input)

		const items = await this.prisma.item.findMany({
			where: {
				userId,
			},
			select: PROFILE_ITEM_SELECT,
			orderBy: {
				createdAt: 'desc',
			},
			...pagination,
		})

		const count = await this.prisma.item.count({
			where: {
				userId,
			},
		})

		return {
			items: items.map((item) => ({
				...item,
				createdAt: item.createdAt,
				imagePaths: item.imagePaths.slice(0, 5),
				imagesCount: item.imagePaths.length,
			})),
			pages: Math.ceil(count / input.take),
		}
	}

	async getItemForEdit(userId: number, itemId?: number) {
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
					attributes: {
						select: {
							name: true,
							properties: {
								select: {
									id: true,
									value: true,
								},
							},
						},
					},
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
			attributes: category.attributes.map((attribute) => ({
				name: attribute.name,
				properties: attribute.properties.map((property) => ({
					label: property.value,
					value: property.id,
				})),
			})),
		}))

		if (!itemId) {
			return {
				categories,
				regions,
			}
		}

		const item = await this.prisma.item.findUnique({
			where: {
				id: itemId,
				userId,
			},
			select: ITEM_FOR_EDIT_SELECT,
		})

		if (!item) {
			return ITEM_ERROR.NOT_FOUND()
		}

		return {
			item: {
				...item,
				properties: item.properties.map((property) => ({
					label: property.value,
					value: property.id,
				})),
				category: {
					label: item.category.name,
					value: item.category.id,
				},
			},
			regions,
			categories,
		}
	}

	async promoteItem(userId: number, itemId: number) {
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
			await this.prisma.item.update({
				where: {
					id: itemId,
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
			return ITEM_ERROR.PROMOTE()
		}
	}

	async upsertItem(input: ItemUpsertInput, userId: number, itemId?: number) {
		const regions = await this.prisma.region.findMany({
			select: { name: true },
		})

		const matchedRegion = regions.find((region) =>
			input.address.includes(region.name)
		)

		const data = {
			name: input.name,
			slug: generateSlug(input.name),
			address: input.address,
			description: input.description,
			hourPrice: Number(input.hourPrice),
			shiftPrice: Number(input.shiftPrice),
			minHours: Number(input.minHours),
			imagePaths: input.imagePaths,
			region: { connect: { name: matchedRegion.name } },
			category: { connect: { id: Number(input.category.value) } },
			user: { connect: { id: userId } },
		}

		const propertiesConnect = input.properties.map((property) => ({
			id: Number(property.value),
		}))

		try {
			if (!itemId) {
				return this.prisma.$transaction(async (transaction) => {
					const createdItem = await transaction.item.create({
						data: {
							...data,
							properties: {
								connect: propertiesConnect,
							},
						},
						select: {
							id: true,
							name: true,
							address: true,
							region: {
								select: {
									name: true,
								},
							},
							description: true,
							hourPrice: true,
							shiftPrice: true,
							minHours: true,
							imagePaths: true,
							category: {
								select: {
									name: true,
								},
							},
							properties: {
								select: {
									value: true,
									attribute: {
										select: {
											name: true,
										},
									},
								},
							},
							user: {
								select: {
									name: true,
								},
							},
							createdAt: true,
						},
					})

					const message = `
<b>🛠️ Создание объявления</b>
				
<b>Пользователь:</b> ${createdItem.user.name}
				
<b>ID:</b> ${createdItem.id}
<b>Название:</b> ${createdItem.name}
<b>Регион:</b> ${createdItem.region.name}
<b>Адрес:</b> ${createdItem.address}
				
<b>Цена за час:</b> ${createdItem.hourPrice} ₽
<b>Цена за смену:</b> ${createdItem.shiftPrice} ₽
<b>Минимальный объем работы:</b> ${createdItem.minHours} часов
				
<b>Категория:</b> ${createdItem.category.name}
					
<b>Характеристики:</b>\n${createdItem.properties
						.map(
							(property) => `- ${property.attribute.name}: ${property.value}`
						)
						.join('\n')}
				
<b>Описание:</b> ${createdItem.description}
					
<b>Дата создания:</b> ${new Date(createdItem.createdAt).toLocaleDateString(
						'ru-RU'
					)}`

					const keyboards = [
						{
							text: 'Подтвердить',
							callback_data: `approve_item_create_${createdItem.id}`,
						},
						{
							text: 'Отклонить',
							callback_data: `reject_item_create_${createdItem.id}`,
						},
					]

					await this.telegramService.sendMessage(
						message,
						keyboards,
						createdItem.imagePaths
					)

					return ''
				})
			} else {
				return this.prisma.$transaction(async (transaction) => {
					const updatedItem = await transaction.item.update({
						where: {
							id: itemId,
							userId,
						},
						data: {
							...data,
							properties: {
								set: [],
								connect: propertiesConnect,
							},
							status: Status.UNDER_REVIEW,
						},
						select: {
							id: true,
							name: true,
							address: true,
							region: {
								select: {
									name: true,
								},
							},
							description: true,
							hourPrice: true,
							shiftPrice: true,
							minHours: true,
							imagePaths: true,
							category: {
								select: {
									name: true,
								},
							},
							properties: {
								select: {
									value: true,
									attribute: {
										select: {
											name: true,
										},
									},
								},
							},
							user: {
								select: {
									name: true,
								},
							},
							createdAt: true,
						},
					})

					const message = `
<b>🛠️ Обновление объявления</b>
				
<b>Пользователь:</b> ${updatedItem.user.name}
				
<b>ID:</b> ${updatedItem.id}
<b>Название:</b> ${updatedItem.name}
<b>Регион:</b> ${updatedItem.region.name}
<b>Адрес:</b> ${updatedItem.address}
				
<b>Цена за час:</b> ${updatedItem.hourPrice} ₽
<b>Цена за смену:</b> ${updatedItem.shiftPrice} ₽
<b>Минимальный объем работы:</b> ${updatedItem.minHours} часов
				
<b>Категория:</b> ${updatedItem.category.name}
					
<b>Характеристики:</b>\n${updatedItem.properties
						.map(
							(property) => `- ${property.attribute.name}: ${property.value}`
						)
						.join('\n')}
				
<b>Описание:</b> ${updatedItem.description}
					
<b>Дата создания:</b> ${new Date(updatedItem.createdAt).toLocaleDateString(
						'ru-RU'
					)}`

					const keyboards = [
						{
							text: 'Подтвердить',
							callback_data: `approve_item_update_${updatedItem.id}`,
						},
						{
							text: 'Отклонить',
							callback_data: `reject_item_update_${updatedItem.id}`,
						},
					]

					await this.telegramService.sendMessage(
						message,
						keyboards,
						updatedItem.imagePaths
					)

					return ''
				})
			}
		} catch (error) {
			return !itemId ? ITEM_ERROR.CREATE() : ITEM_ERROR.UPDATE()
		}
	}

	async deleteItem(userId: number, itemId: number) {
		try {
			await this.prisma.item.delete({
				where: {
					id: itemId,
					userId,
				},
			})

			return true
		} catch {
			return ITEM_ERROR.DELETE()
		}
	}

	async changeItemStatus(id: number, status: Status, context: Context) {
		try {
			const item = await this.prisma.item.update({
				where: { id },
				data: { status },
				select: { id: true },
			})

			await context.answerCbQuery()

			const statusMessage =
				status === Status.PUBLISHED
					? `<b>ID: ${item.id}</b> - Спецтехника успешно опубликована.`
					: `<b>ID: ${item.id}</b> - Спецтехника успешно отклонена.`

			await this.telegramService.sendMessage(statusMessage, [])
		} catch (error) {
			await context.answerCbQuery()
			await this.telegramService.sendMessage(
				'Произошла ошибка при обновлении статуса спецтехники. Пожалуйста, попробуйте позже.',
				[]
			)
		}
	}
}
