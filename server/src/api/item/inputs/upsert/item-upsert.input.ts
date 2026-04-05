import { Field, InputType } from '@nestjs/graphql'
import { SelectOptionInput } from 'src/shared/inputs/select-option/select.option.input'

@InputType()
export class ItemUpsertInput {
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

	@Field(() => [SelectOptionInput])
	properties: SelectOptionInput[]

	@Field(() => SelectOptionInput)
	category: SelectOptionInput
}
