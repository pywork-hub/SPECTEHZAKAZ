import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Property } from 'src/api/property/entities/property/property.entity'
import { Status } from 'src/shared/enums/status/status.enum'

@ObjectType()
export class ProfileItem {
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

	@Field(() => [Property])
	properties: Property[]

	@Field(() => String, { nullable: true })
	promotionExpiredAt?: string

	@Field(() => Status)
	status: Status

	@Field(() => Date)
	createdAt: Date
}
