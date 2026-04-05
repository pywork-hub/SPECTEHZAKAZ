import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Review {
	@Field(() => String)
	name: string

	@Field(() => String)
	description: string

	@Field(() => String, { nullable: true })
	filePath?: string

	@Field(() => Int)
	rating: number

	@Field(() => String)
	createdAt: string
}
