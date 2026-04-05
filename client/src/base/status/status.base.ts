import { Status } from '@/__generated__/output'

export const STATUS_LABEL = {
	[Status.UnderReview]: 'На проверке',
	[Status.Canceled]: 'Отклонено',
	[Status.Published]: 'Опубликовано',
}
