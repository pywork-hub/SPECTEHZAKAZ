import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Reviews } from './entities/reviews/reviews.entity'
import { ReviewsFiltersInput } from './inputs/filters/reviews-filters.input'
import { LeaveReviewInput } from './inputs/leave/leave-review.input'
import { ReviewService } from './review.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorator/current-user.decorator'

@Resolver()
export class ReviewResolver {
	constructor(private readonly reviewService: ReviewService) {}

	@Query(() => Reviews, { name: 'reviews' })
	async getItems(@Args('filters') filters: ReviewsFiltersInput) {
		return this.reviewService.getReviews(filters)
	}

	@Auth()
	@Mutation(() => Boolean, { name: 'leaveReview' })
	async leaveReview(@Args('data') input: LeaveReviewInput, @CurrentUser('id') userId: number) {
		return this.reviewService.leaveReview(input, userId)
	}
}
