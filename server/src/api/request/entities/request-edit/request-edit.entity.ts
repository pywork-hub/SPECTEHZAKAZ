import { Field, ObjectType } from '@nestjs/graphql'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'

@ObjectType()
export class RequestEdit {
	@Field(() => SelectOption)
	region: SelectOption

	@Field(() => String)
	description: string

	@Field(() => String)
	phone: string

	@Field(() => String, { nullable: true })
	price?: string

	@Field(() => SelectOption)
	pricingType: SelectOption

	@Field(() => SelectOption)
	paymentMethod: SelectOption

	@Field(() => String)
	quantity: string

	@Field(() => String)
	startAt: string

	@Field(() => SelectOption)
	category: SelectOption
}
