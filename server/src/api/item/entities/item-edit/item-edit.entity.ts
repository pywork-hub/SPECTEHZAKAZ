import { Field, ObjectType } from '@nestjs/graphql'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'

@ObjectType()
export class ItemEdit {
	@Field(() => String)
	name: string

	@Field(() => String)
	address: string

	@Field(() => String)
	description: string

	@Field(() => [String])
	imagePaths: string[]

	@Field(() => String)
	hourPrice: string

	@Field(() => String)
	shiftPrice: string

	@Field(() => String)
	minHours: string

	@Field(() => [SelectOption])
	properties: SelectOption[]

	@Field(() => SelectOption)
	category: SelectOption
}
