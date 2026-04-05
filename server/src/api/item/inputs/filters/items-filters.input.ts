import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from 'src/api/pagination/input/pagination.input'
import { Sort } from 'src/shared/enums/sort/sort.enum'

@InputType()
export class ItemsFiltersInput {
	@Field(() => PaginationInput)
	pagination: PaginationInput

	@Field(() => [String], { nullable: true })
	categories?: string[]

	@Field(() => [String], { nullable: true })
	regions?: string[]

	@Field(() => String, { nullable: true })
	minHourPrice?: string

	@Field(() => String, { nullable: true })
	maxHourPrice?: string

	@Field(() => String, { nullable: true })
	minShiftPrice?: string

	@Field(() => String, { nullable: true })
	maxShiftPrice?: string

	@Field(() => Sort, { nullable: true })
	ratingSort?: Sort

	@Field(() => Sort, { nullable: true })
	priceSort?: Sort

	@Field(() => Sort, { nullable: true })
	createdAtSort?: Sort
}
