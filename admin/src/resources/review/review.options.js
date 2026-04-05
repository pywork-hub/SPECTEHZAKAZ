import {StatusTranslate} from "../../utils/translate/translate-enum.util.js";

export const reviewOptions = componentLoader => ({
    options: {
        properties: { status: { availableValues: StatusTranslate } },
        navigation: { name: 'Отзывы', icon: 'MessageCircle' },
        label: 'Отзывы',
        actions: {
            new: {
                isVisible: false,
            }
        },
    },
})