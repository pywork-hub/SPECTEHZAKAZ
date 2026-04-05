import { PaymentMethod, type SelectOption } from '@/__generated__/output'

export const PAYMENT_METHODS: SelectOption[] = [
	{
		label: 'Наличный расчет',
		value: PaymentMethod.Cash,
	},
	{
		label: 'Безналичный расчет без НДС',
		value: PaymentMethod.CashlessWithoutVat,
	},
	{
		label: 'Безналичный расчет с НДС',
		value: PaymentMethod.CashlessWithVat,
	},
]

export const PAYMENT_METHOD_LABEL = {
	[PaymentMethod.Cash]: 'Наличный расчет',
	[PaymentMethod.CashlessWithoutVat]: 'Безналичный расчет без НДС',
	[PaymentMethod.CashlessWithVat]: 'Безналичный расчет с НДС',
}
