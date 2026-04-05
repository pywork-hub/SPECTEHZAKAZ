import { Field, InputType } from '@nestjs/graphql'
import { PaginationInput } from 'src/api/pagination/input/pagination.input'
import { PaymentMethod } from 'src/shared/enums/payment-method/payment-method.enum'

@InputType()
export class RequestsFiltersInput {
	@Field(() => PaginationInput)
	pagination: PaginationInput

	@Field(() => [String], { nullable: true })
	categories?: string[]

	@Field(() => [String], { nullable: true })
	regions?: string[]

	@Field(() => PaymentMethod, { nullable: true })
	paymentMethod?: PaymentMethod
}
