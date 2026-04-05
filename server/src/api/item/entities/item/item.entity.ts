import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Property } from 'src/api/property/entities/property/property.entity'
import { ItemUser } from 'src/api/user/entities/item-user/item-user.entity'

@ObjectType()
export class Item {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	address: string

	@Field(() => [String])
	imagePaths: string[]

	@Field(() => Int)
	imagesCount: number

	@Field(() => Int)
	hourPrice: number

	@Field(() => Int)
	shiftPrice: number

	@Field(() => Int)
	minHours: number

	@Field(() => String)
	averageRating: string

	@Field(() => Int)
	reviewsCount: number

	@Field(() => [Property])
	properties: Property[]

	@Field(() => ItemUser)
	user: ItemUser

	@Field(() => Date)
	createdAt: Date
}
