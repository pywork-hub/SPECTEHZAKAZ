import { Field, Int, ObjectType } from '@nestjs/graphql'
import { RequestCategory } from 'src/api/category/entities/request-category/request-category.entity'
import { PaymentMethod } from 'src/shared/enums/payment-method/payment-method.enum'
import { PricingType } from 'src/shared/enums/pricing-type/pricing-type.enum'
import { Status } from 'src/shared/enums/status/status.enum'

@ObjectType()
export class ProfileRequest {
	@Field(() => Int)
	id: number

	@Field(() => String)
	region: string

	@Field(() => String)
	description: string

	@Field(() => Int)
	quantity: number

	@Field(() => String)
	startAt: string

	@Field(() => Int, { nullable: true })
	price?: number

	@Field(() => PricingType)
	pricingType: PricingType

	@Field(() => PaymentMethod)
	paymentMethod: PaymentMethod

	@Field(() => Date)
	createdAt: Date

	@Field(() => String, { nullable: true })
	promotionExpiredAt?: string

	@Field(() => RequestCategory)
	category: RequestCategory

	@Field(() => Status)
	status: Status
}
