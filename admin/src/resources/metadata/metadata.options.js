import { PageTranslate } from '../../utils/translate/translate-enum.util.js'

export const metadataOptions = componentLoader => ({
	options: {
		properties: {
			title: { isRequired: true },
			page: { isRequired: true, availableValues: PageTranslate },
		},
		navigation: { name: 'SEO', icon: 'Info' },
		label: 'Мета-теги',
	},
})
