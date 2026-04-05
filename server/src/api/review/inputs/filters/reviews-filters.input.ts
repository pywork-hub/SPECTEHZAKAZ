import { Field, InputType, Int } from '@nestjs/graphql'
import { PaginationInput } from 'src/api/pagination/input/pagination.input'

@InputType()
export class ReviewsFiltersInput {
	@Field(() => PaginationInput)
	pagination: PaginationInput

	@Field(() => Int)
	itemId: number
}
