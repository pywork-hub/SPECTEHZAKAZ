import type { CurrentItem, Item, Status } from '@/__generated__/output'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IItem extends IClassName {
	item: Item & {
		status?: Status
		promotionExpiredAt?: string
	}
	isSecured?: boolean
	onContacts?: () => void
	onPromote?: () => void
	onEdit?: () => void
	onDelete?: () => void
}

export interface ICurrentItem extends IClassName {
	item: CurrentItem
}
