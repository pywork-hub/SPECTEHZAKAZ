export const faqOptions = componentLoader => ({
	options: {
		navigation: { name: 'Настройки сайта', icon: 'List' },
		label: 'FAQ',
		properties: {
			question: { isRequired: true, label: 'Вопрос' },
			answer: {
				label: 'Ответ',
				isRequired: true,
				type: 'textarea',
				props: {
					rows: 5,
					style: { resize: 'vertical' },
				},
			},
			order: {
				label: 'Порядок',
				isRequired: true,
				type: 'number',
				props: { type: 'number' },
			},
		},
	},
})
