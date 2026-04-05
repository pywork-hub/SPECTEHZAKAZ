import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Attribute {
	@Field(() => String)
	name: string
}
