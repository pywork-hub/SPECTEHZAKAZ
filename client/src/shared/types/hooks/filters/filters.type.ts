import type {
	ItemsFiltersInput,
	RequestsFiltersInput,
} from '@/__generated__/output'

export type TypeFilters = Omit<
	ItemsFiltersInput & RequestsFiltersInput,
	'pagination'
>
