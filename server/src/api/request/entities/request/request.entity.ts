import { Field, Int, ObjectType } from '@nestjs/graphql'
import { RequestCategory } from 'src/api/category/entities/request-category/request-category.entity'
import { UserContacts } from 'src/api/user/entities/user-contacts/user-contacts.entity'
import { PaymentMethod } from 'src/shared/enums/payment-method/payment-method.enum'
import { PricingType } from 'src/shared/enums/pricing-type/pricing-type.enum'

@ObjectType()
export class Request {
	@Field(() => Int)
	id: number

	@Field(() => String)
	region: string

	@Field(() => String)
	description: string

	@Field(() => String)
	phone: string

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

	@Field(() => RequestCategory)
	category: RequestCategory

	@Field(() => UserContacts)
	user: UserContacts
}
