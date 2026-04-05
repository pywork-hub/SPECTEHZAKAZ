import ClockIcon from '@/components/icons/ClockIcon'
import CoinsIcon from '@/components/icons/CoinsIcon'
import KeyRoundIcon from '@/components/icons/KeyRoundIcon'
import ShieldIcon from '@/components/icons/ShieldIcon'
import TrophyIcon from '@/components/icons/TrophyIcon'
import type { TypeAdvantage } from '@/shared/types/parts/advantage/advantage.type'

export const BUYER_ADVANTAGES: TypeAdvantage[] = [
	{
		icon: TrophyIcon,
		heading: 'Лучшие предложения',
		description:
			'Выберите лучшие условия из множества предложений исполнителей.',
	},
	{
		icon: CoinsIcon,
		heading: 'Бесплатное размещение заказов',
		description:
			'Разместите ваш заказ совершенно бесплатно, пройдя простую регистрацию.',
	},
	{
		icon: ClockIcon,
		heading: 'Экономия времени и бюджета',
		description:
			'Автоматический поиск спецтехники сэкономит ваше время и бюджет.',
	},
]

export const PROVIDER_ADVANTAGES: TypeAdvantage[] = [
	{
		icon: KeyRoundIcon,
		heading: 'Доступ к заказам',
		description:
			'Помимо размещения объявления получите доступ к просмотру заказов.',
	},
	{
		icon: CoinsIcon,
		heading: 'Бесплатное размещение объявлений',
		description: 'Разместите всю вашу технику бесплатно прямо сейчас.',
	},
	{
		icon: ShieldIcon,
		heading: 'Надежность клиентов',
		description: 'Проверьте надежность заказчика, оценив его рейтинг и отзывы.',
	},
]
