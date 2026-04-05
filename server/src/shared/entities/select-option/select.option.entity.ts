import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SelectOption {
	@Field(() => String)
	label: string

	@Field(() => String)
	value: string
}