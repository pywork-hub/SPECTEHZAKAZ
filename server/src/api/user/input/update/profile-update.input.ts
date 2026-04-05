import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProfileUpdateInput {
	@Field(() => String)
	name: string

	@Field(() => String)
	email: string

	@Field(() => String)
	phone: string

	@Field(() => [String])
	avatarPath: string[]

	@Field(() => String, { nullable: true })
	oldPassword?: string

	@Field(() => String, { nullable: true })
	newPassword?: string
}
