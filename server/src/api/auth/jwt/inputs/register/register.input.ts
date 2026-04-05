import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RegisterInput {
	@Field(() => String)
	name: string

	@Field(() => String)
	phone: string

	@Field(() => String)
	email: string

	@Field(() => String)
	password: string

	@Field(() => Boolean)
	isRemember: boolean
}
