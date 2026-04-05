import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Review } from '../review/review.entity'

@ObjectType()
export class Reviews {
	@Field(() => [Review])
	reviews: Review[]

	@Field(() => Int)
	pages: number
}
