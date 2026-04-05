import { PaymentMethod } from 'src/shared/enums/payment-method/payment-method.enum'

export const PAYMENT_METHOD_LABEL = {
	[PaymentMethod.CASH]: 'Наличный расчет',
	[PaymentMethod.CASHLESS_WITHOUT_VAT]: 'Безналичный расчет без НДС',
	[PaymentMethod.CASHLESS_WITH_VAT]: 'Безналичный расчет с НДС',
}
