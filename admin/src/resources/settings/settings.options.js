import {PrismaClient} from "@prisma/client";
import {Components} from "../../index.js";

const prisma = new PrismaClient()

export const settingsOptions = componentLoader => ({
    options: {
        navigation: {name: 'Настройки сайта', icon: 'Settings'},
        label: 'Настройки',
        properties: {
            id: {isVisible: false},
            itemPromotePrice: {
                isRequired: true,
                type: 'number',
                props: {type: 'number'}
            },
            requestPromotePrice: {
                isRequired: true,
                type: 'number',
                props: {type: 'number'}
            }
        },
        actions: {
            list: {
                after: [async request => {
                    request.records[0].params.id = 1;
                    request.records[0].id = 0;
                    request.records[0].title = 'Настройки';
                    return request;
                }]
            },
            customEditSettings: {
                actionType: 'record',
                component: Components.CustomEditSettings,
                handler: (request, response, context) => {
                    console.log(request)
                    const { record, currentAdmin } = context
                    return {
                        record: record.toJSON(currentAdmin),
                        msg: 'Hello world',
                    }
                },
            },
            show: {
                path: '/settings/show',
                handler: async (request, context) => {
                    const record = await prisma.settings.findUnique({ where: { id: 0 } });
                    return { record };
                }
            },
            edit: { isVisible: false },
            new: { isVisible: false },
            delete: { isVisible: false },
            bulkDelete: { isVisible: false },
        }
    },
})