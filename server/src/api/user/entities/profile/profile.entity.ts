import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserContacts } from '../user-contacts/user-contacts.entity'

@ObjectType()
export class Profile extends UserContacts {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	email: string

	@Field(() => String)
	avatarPath: string

	@Field(() => String)
	createdAt: string

	@Field(() => Int)
	itemsCount: number

	@Field(() => Int)
	requestsCount: number
}
