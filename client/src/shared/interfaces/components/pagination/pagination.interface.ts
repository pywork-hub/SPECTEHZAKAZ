import type { IClassName } from '../../common/class-name/class-name.interface'

export interface IPagination extends IClassName {
	page: number
	pages: number
	prev: () => void
	next: () => void
	goTo: (page: number) => void
}
