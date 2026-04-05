import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Metadata {
	@Field(() => String)
	title: string

	@Field(() => String, { nullable: true })
	description?: string
}
