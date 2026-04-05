import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Seo {
	@Field(() => String)
	heading: string

	@Field(() => String)
	description: string
}
