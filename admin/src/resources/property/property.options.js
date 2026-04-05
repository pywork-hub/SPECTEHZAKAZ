export const propertyOptions = componentLoader => ({
    options: {
        navigation: { name: 'Каталог', icon: 'Settings2' },
        label: 'Свойства',
        properties: {
            value: {
                isRequired: true,
                isTitle: true
            },
            attribute: {isVisible: { list: true, show: true, edit: true, filter: true }}
        },
    },
})