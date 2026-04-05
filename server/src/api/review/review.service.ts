import { Injectable } from '@nestjs/common'
import { REVIEW_ERROR } from 'src/errors/review/review.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { Status } from 'src/shared/enums/status/status.enum'
import { formatDate } from 'src/utils/formats/format-date.util'
import type { Context } from 'telegraf'
import { PaginationService } from '../pagination/pagination.service'
import { TelegramService } from '../telegram/telegram.service'
import { ReviewsFiltersInput } from './inputs/filters/reviews-filters.input'
import type { LeaveReviewInput } from './inputs/leave/leave-review.input'
import { REVIEW_SELECT } from './selects/review/review.select'

@Injectable()
export class ReviewService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly telegramService: TelegramService,
		private readonly paginationService: PaginationService
	) {}

	async getReviews(filters: ReviewsFiltersInput) {
		const pagination = this.paginationService.getPagination(filters.pagination)

		const where = {
			itemId: filters.itemId,
			status: Status.PUBLISHED,
		}

		const reviews = await this.prisma.review.findMany({
			where,
			orderBy: {
				createdAt: 'desc',
			},
			select: REVIEW_SELECT,
			...pagination,
		})

		const count = await this.prisma.review.count({
			where,
		})

		return {
			reviews: reviews.map((review) => ({
				...review,
				name: review.user.name,
				createdAt: formatDate(review.createdAt, 'normal'),
			})),
			pages: Math.ceil(count / filters.pagination.take),
		}
	}

	async leaveReview(input: LeaveReviewInput, userId: number) {
		try {
			return this.prisma.$transaction(async (transaction) => {
				const reviewExist = await transaction.review.findFirst({
					where: {
						userId,
						itemId: input.itemId,
						status: {
							not: Status.CANCELED,
						},
					},
					select: { status: true },
				})

				if (reviewExist) {
					return REVIEW_ERROR.ALREADY_RATED(reviewExist.status)
				}

				const review = await transaction.review.create({
					data: {
						description: input.description,
						rating: input.rating,
						item: {
							connect: {
								id: input.itemId,
							},
						},
						user: {
							connect: {
								id: userId,
							},
						},
					},
					select: { id: true, user: { select: { name: true, phone: true } } },
				})

				const message = `
<b>📝 Новый отзыв на спецтехнику</b>
				
<b>ID отзыва:</b> ${review.id}
<b>Имя пользователя:</b> ${review.user.name}
<b>Телефон:</b> ${review.user.phone}
				
<b>⭐ Рейтинг:</b> ${input.rating}
				
<b>Описание отзыва:</b> ${input.description}`

				const keyboards = [
					{ text: 'Подтвердить', callback_data: `approve_review_${review.id}` },
					{ text: 'Отклонить', callback_data: `reject_review_${review.id}` },
					{
						text: 'Открыть спецтехнику',
						url: `${process.env.NEXT_APP_URL}/item/${input.itemId}`,
					},
				]

				await this.telegramService.sendMessage(message, keyboards)

				return true
			})
		} catch {
			return REVIEW_ERROR.LEAVE()
		}
	}

	async changeReviewStatus(id: number, status: Status, context: Context) {
		try {
			const review = await this.prisma.review.update({
				where: { id },
				data: { status },
				select: {
					id: true,
					rating: true,
					item: {
						select: {
							averageRating: true,
							_count: {
								select: {
									reviews: {
										where: {
											status: Status.PUBLISHED,
										},
									},
								},
							},
						},
					},
					itemId: true,
				},
			})

			if (status === Status.PUBLISHED) {
				const newAverage =
					(Number(review.item.averageRating) * review.item._count.reviews +
						review.rating) /
					(review.item._count.reviews + 1)

				await this.prisma.item.update({
					where: {
						id: review.itemId,
					},
					data: {
						averageRating: newAverage,
					},
				})
			} else if (status === Status.CANCELED) {
				const remainingReviews = review.item._count.reviews - 1

				if (remainingReviews > 0) {
					const sumOfRatings = await this.prisma.review.aggregate({
						_sum: {
							rating: true,
						},
						where: {
							itemId: review.itemId,
							status: Status.PUBLISHED,
						},
					})

					const newAverage =
						(sumOfRatings._sum.rating - review.rating) / remainingReviews

					await this.prisma.item.update({
						where: {
							id: review.itemId,
						},
						data: {
							averageRating: newAverage,
						},
					})
				} else {
					await this.prisma.item.update({
						where: {
							id: review.itemId,
						},
						data: {
							averageRating: 5,
						},
					})
				}
			}

			await context.answerCbQuery()

			const statusMessage =
				status === Status.PUBLISHED
					? `<b>ID: ${review.id}</b> - Отзыв успешно опубликован.`
					: `<b>ID: ${review.id}</b> - Отзыв успешно отклонен.`

			await this.telegramService.sendMessage(statusMessage, [])
		} catch (error) {
			await context.answerCbQuery()
			await this.telegramService.sendMessage(
				'Произошла ошибка при обновлении статуса отзыва. Пожалуйста, попробуйте позже.',
				[]
			)
		}
	}
}
