import { PricingType, type SelectOption } from '@/__generated__/output'

export const PRICING_TYPES: SelectOption[] = [
	{
		label: 'За час',
		value: PricingType.PerHour,
	},
	{
		label: 'За смену',
		value: PricingType.ForShift,
	},
	{
		label: 'За рейс',
		value: PricingType.ForTrip,
	},
	{
		label: 'За тонну',
		value: PricingType.PerTon,
	},
	{
		label: 'За м3',
		value: PricingType.PerM3,
	},
]

export const PRICING_TYPE_LABEL = {
	[PricingType.PerHour]: 'за час',
	[PricingType.ForShift]: 'за смену',
	[PricingType.ForTrip]: 'за рейс',
	[PricingType.PerTon]: 'за тонну',
	[PricingType.PerM3]: 'за м3',
}
