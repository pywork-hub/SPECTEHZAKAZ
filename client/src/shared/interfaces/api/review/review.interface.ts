import type { Review } from '@/__generated__/output'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IReview extends IClassName {
	review: Review
}
