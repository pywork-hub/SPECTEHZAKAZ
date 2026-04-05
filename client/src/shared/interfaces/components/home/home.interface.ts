import type { SelectOption } from '@/__generated__/output'
import type { ICategories } from '../../api/category/category.interface'

export interface IHomeCatalog extends ICategories {
	itemRegions: SelectOption[]
	requestRegions: SelectOption[]
}
