import { registerEnumType } from '@nestjs/graphql'

export enum PricingType {
	PER_HOUR = 'PER_HOUR',
	PER_TON = 'PER_TON',
	PER_M3 = 'PER_M3',
	FOR_SHIFT = 'FOR_SHIFT',
	FOR_TRIP = 'FOR_TRIP',
}

registerEnumType(PricingType, {
	name: 'PricingType',
})
