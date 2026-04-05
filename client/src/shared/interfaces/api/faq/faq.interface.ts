import type { Faq } from '@/__generated__/output'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IFaqs {
	faqs: Faq[]
}

export interface IFaq extends IClassName {
	faq: Faq
}
