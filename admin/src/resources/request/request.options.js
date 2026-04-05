import {
    PaymentMethodTranslate,
    PricingTypeTranslate,
    StatusTranslate
} from "../../utils/translate/translate-enum.util.js";

export const requestOptions = componentLoader => ({
    options: {
        navigation: { name: 'Каталог', icon: 'Send' },
        label: 'Запросы',
        properties: {
            price: {
                isRequired: true,
                type: 'number',
                props: { type: 'number' }
            },
            pricingType: { availableValues: PricingTypeTranslate },
            paymentMethod: { availableValues: PaymentMethodTranslate },
            status: { availableValues: StatusTranslate },
            description: {
                label: 'Описание',
                isRequired: true,
                type: 'textarea',
                props: {
                    rows: 5,
                    style: {resize: 'vertical'}
                }
            },
            quantity: {
                isRequired: true,
                type: 'number',
                props: { type: 'number' }
            },
            startAt: { isRequired: true },
            region: {
                isRequired: true,
                label: 'Регион',
                type: 'reference',
                reference: 'Region',
                isVisible: true,
            },
            category: {
                isRequired: true,
                label: 'Категория',
                type: 'reference',
                reference: 'Category',
                isVisible: true,
            },
            promotionExpiredAt: { isVisible: false },
        },
    },
})