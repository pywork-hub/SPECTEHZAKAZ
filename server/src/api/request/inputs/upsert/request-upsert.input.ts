import { Field, InputType } from '@nestjs/graphql'
import { SelectOptionInput } from 'src/shared/inputs/select-option/select.option.input'

@InputType()
export class RequestUpsertInput {
	@Field(() => SelectOptionInput)
	region: SelectOptionInput

	@Field(() => String)
	description: string

	@Field(() => String)
	phone: string

	@Field(() => String, { nullable: true })
	price?: string

	@Field(() => SelectOptionInput)
	pricingType: SelectOptionInput

	@Field(() => SelectOptionInput)
	paymentMethod: SelectOptionInput

	@Field(() => String)
	quantity: string

	@Field(() => String)
	startAt: string

	@Field(() => SelectOptionInput)
	category: SelectOptionInput
}
