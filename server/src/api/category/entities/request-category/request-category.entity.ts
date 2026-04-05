import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RequestCategory {
	@Field(() => String)
	name: string

	@Field(() => String)
	iconPath: string
}
