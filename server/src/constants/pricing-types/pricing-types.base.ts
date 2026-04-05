import { PricingType } from 'src/shared/enums/pricing-type/pricing-type.enum'

export const PRICING_TYPE_LABEL = {
	[PricingType.PER_HOUR]: 'За час',
	[PricingType.FOR_SHIFT]: 'За смену',
	[PricingType.FOR_TRIP]: 'За рейс',
	[PricingType.PER_TON]: 'За тонну',
	[PricingType.PER_M3]: 'За м3',
}
