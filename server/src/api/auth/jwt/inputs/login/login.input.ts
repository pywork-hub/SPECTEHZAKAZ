import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginInput {
	@Field(() => String, { nullable: true })
	email?: string

	@Field(() => String, { nullable: true })
	phone?: string

	@Field(() => String)
	password: string

	@Field(() => Boolean)
	isRemember: boolean
}
