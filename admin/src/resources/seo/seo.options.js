import {PageTranslate} from "../../utils/translate/translate-enum.util.js";

export const seoOptions = componentLoader => ({
    options: {
        properties: {
            heading: {isRequired: true},
            description: {
                isRequired: true,
                type: 'textarea',
                props: {
                    rows: 5,
                    style: {resize: 'vertical'}
                }
            },
            page: {isRequired: true, availableValues: PageTranslate}
        },
        navigation: {name: 'SEO', icon: 'TrendingUp'},
        label: 'SEO-настройки',
    },
})