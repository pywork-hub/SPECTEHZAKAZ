import {translit} from "../../utils/helpers/slug/generate-slug.util.js";

export const regionOptions = componentLoader => ({
    options: {
        navigation: { name: 'Настройки сайта', icon: 'MapPin' },
        label: 'Регионы',
        properties: {
            name: { isRequired: true },
        },
        editProperties: [ 'name' ],
        actions: {
            new: {
                before: [async (request) => {
                    if (request.payload.name) {
                        request.payload.slug = translit(request.payload.name.toLowerCase());
                    }
                    return request;
                }]
            },
            edit: {
                before: [async (request) => {
                    if (request.payload.name) {
                        request.payload.slug = translit(request.payload.name.toLowerCase());
                    }
                    return request;
                }]
            }
        }
    },
})