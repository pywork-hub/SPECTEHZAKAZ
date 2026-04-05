import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Region {
	@Field(() => String)
	name: string

	@Field(() => String)
	slug: string
}
