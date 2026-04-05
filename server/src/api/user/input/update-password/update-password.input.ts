import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePasswordInput {
	@Field(() => String)
	phone: string

	@Field(() => String)
	password: string

	@Field(() => String)
	confirmPassword: string
}
