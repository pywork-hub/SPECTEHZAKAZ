import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Faq {
	@Field(() => String)
	question: string

	@Field(() => String)
	answer: string
}
