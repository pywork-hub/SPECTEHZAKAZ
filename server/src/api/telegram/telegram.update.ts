import { Action, Ctx, Update } from 'nestjs-telegraf'
import { Status } from 'src/shared/enums/status/status.enum'
import { ItemService } from '../item/item.service'
import { RequestService } from '../request/request.service'
import { ReviewService } from '../review/review.service'

@Update()
export class TelegramUpdate {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly requestService: RequestService,
		private readonly itemService: ItemService
	) {}

	@Action(/approve_review_(\d+)/)
	async approveReview(@Ctx() ctx: any) {
		const reviewId = parseInt(ctx.match.input.split('_')[2], 10)

		return this.reviewService.changeReviewStatus(
			reviewId,
			Status.PUBLISHED,
			ctx
		)
	}

	@Action(/reject_review_(\d+)/)
	async rejectReview(@Ctx() ctx: any) {
		const reviewId = parseInt(ctx.match.input.split('_')[2], 10)

		return this.reviewService.changeReviewStatus(reviewId, Status.CANCELED, ctx)
	}

	@Action(/approve_request_create_(\d+)/)
	async approveRequestCreate(@Ctx() ctx: any) {
		const requestId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.requestService.changeRequestStatus(
			requestId,
			Status.PUBLISHED,
			ctx
		)
	}

	@Action(/reject_request_create_(\d+)/)
	async rejectRequestCreate(@Ctx() ctx: any) {
		const requestId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.requestService.changeRequestStatus(
			requestId,
			Status.CANCELED,
			ctx
		)
	}

	@Action(/approve_request_update_(\d+)/)
	async approveRequestUpdate(@Ctx() ctx: any) {
		const requestId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.requestService.changeRequestStatus(
			requestId,
			Status.PUBLISHED,
			ctx
		)
	}

	@Action(/reject_request_update_(\d+)/)
	async rejectRequestUpdate(@Ctx() ctx: any) {
		const requestId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.requestService.changeRequestStatus(
			requestId,
			Status.CANCELED,
			ctx
		)
	}

	@Action(/approve_item_create_(\d+)/)
	async approveItemCreate(@Ctx() ctx: any) {
		const itemId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.itemService.changeItemStatus(itemId, Status.PUBLISHED, ctx)
	}

	@Action(/reject_item_create_(\d+)/)
	async rejectItemCreate(@Ctx() ctx: any) {
		const itemId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.itemService.changeItemStatus(itemId, Status.CANCELED, ctx)
	}

	@Action(/approve_item_update_(\d+)/)
	async approveItemUpdate(@Ctx() ctx: any) {
		const itemId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.itemService.changeItemStatus(itemId, Status.PUBLISHED, ctx)
	}

	@Action(/reject_item_update_(\d+)/)
	async rejectItemUpdate(@Ctx() ctx: any) {
		const itemId = parseInt(ctx.match.input.split('_')[3], 10)

		return this.itemService.changeItemStatus(itemId, Status.CANCELED, ctx)
	}
}
