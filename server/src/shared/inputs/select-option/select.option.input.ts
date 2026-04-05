import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SelectOptionInput {
	@Field(() => String)
	label: string

	@Field(() => String)
	value: string
}
