import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProfileEdit {
	@Field(() => String)
	name: string

	@Field(() => String)
	email: string

	@Field(() => String)
	phone: string

	@Field(() => [String])
	avatarPath: string[]
}
