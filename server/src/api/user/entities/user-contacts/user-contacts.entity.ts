import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserContacts {
	@Field(() => String)
	phone: string
}
