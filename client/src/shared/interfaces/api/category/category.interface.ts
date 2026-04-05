import type { Category } from '@/__generated__/output'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface ICategories {
	categories: Category[]
}

export interface ICategory extends IClassName {
	category: Category
}
