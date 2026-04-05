import { PUBLIC_ROUTE } from '@/constants/route/route.constants'
import type { IButton } from '@/shared/interfaces/common/button/button.interface'

export const HEADER_PAGES: IButton[] = [
	{
		label: 'Главная',
		href: PUBLIC_ROUTE.HOME,
	},
	{
		label: 'Исполнители',
		href: PUBLIC_ROUTE.ITEMS(),
	},
	{
		label: 'Заказы',
		href: PUBLIC_ROUTE.REQUESTS(),
	},
	{
		label: 'Контакты',
		href: PUBLIC_ROUTE.CONTACTS,
	},
]

export const FOOTER_PAGES: IButton[] = [...HEADER_PAGES]
