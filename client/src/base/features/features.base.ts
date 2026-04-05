import feature1Image from '@/assets/images/features/feature-1.png'
import feature2Image from '@/assets/images/features/feature-2.png'
import type { TypeFeature } from '@/shared/types/parts/feature/feature.type'

export const FEATURES: TypeFeature[] = [
	{
		heading: 'Ищите услуги спецтехники?',
		description:
			'Бесплатно опубликуйте ваш заказ или перейдите в наш каталог исполнителей, чтобы найти самые выгодные предложения.',
		image: {
			src: feature1Image.src,
			alt: 'Заказ спецтехники',
		},
		button: 'Добавить заказ',
		isOrder: true,
		scheme: 'gray',
	},
	{
		heading: 'Оказываете услуги спецтехники?',
		description:
			'Бесплатно добавьте ваше объявление в наш каталог и ознакомьтесь с опубликованными заказами, чтобы найти новых заказчиков.',
		image: {
			src: feature2Image.src,
			alt: 'Продать спецтехнику',
		},
		button: 'Добавить технику',
		scheme: 'orange',
	},
]
