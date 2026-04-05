import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class LeaveReviewInput {
	@Field(() => String)
	description: string

	@Field(() => Int)
	rating: number

	@Field(() => Int)
	itemId: number
}
