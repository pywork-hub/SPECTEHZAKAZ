import { Field, Int, ObjectType } from '@nestjs/graphql'
import { UserContacts } from '../user-contacts/user-contacts.entity'

@ObjectType()
export class ItemUser extends UserContacts {
	@Field(() => String)
	name: string

	@Field(() => String)
	avatarPath: string

	@Field(() => Int)
	itemsCount: number

	@Field(() => String)
	createdAt: string
}
