import HelpIcon from '@/components/icons/HelpIcon'
import LocateIcon from '@/components/icons/LocateIcon'
import MapIcon from '@/components/icons/MapIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import type { TypeStep } from '@/shared/types/parts/step/step.type'

export const STEPS: TypeStep[] = [
	{
		icon: SearchIcon,
		heading: 'Поиск',
		description: 'Простой и удобный поиск заказов и спецтехники.',
	},
	{
		icon: LocateIcon,
		heading: 'Всё в одном месте',
		description: 'Все виды спецтехники в одном месте.',
	},
	{
		icon: HelpIcon,
		heading: 'Поддержка',
		description: 'Персональная служба технической поддержки.',
	},
	{
		icon: MapIcon,
		heading: 'Доступность',
		description: 'Для использования нужно только пройти регистрацию.',
	},
]
