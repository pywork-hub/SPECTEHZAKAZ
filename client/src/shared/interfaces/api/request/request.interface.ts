import type { Request, Status } from '@/__generated__/output'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IRequest extends IClassName {
	request: Request & {
		status?: Status
		promotionExpiredAt?: string
	}
	isSecured?: boolean
	onContacts?: () => void
	onPromote?: () => void
	onEdit?: () => void
	onDelete?: () => void
}
