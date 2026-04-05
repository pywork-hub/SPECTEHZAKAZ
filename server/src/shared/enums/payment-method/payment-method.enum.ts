import { registerEnumType } from '@nestjs/graphql'

export enum PaymentMethod {
	CASH = 'CASH',
	CASHLESS_WITHOUT_VAT = 'CASHLESS_WITHOUT_VAT',
	CASHLESS_WITH_VAT = 'CASHLESS_WITH_VAT',
}

registerEnumType(PaymentMethod, {
	name: 'PaymentMethod',
})
