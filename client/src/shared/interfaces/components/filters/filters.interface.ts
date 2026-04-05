import type { SelectOption } from '@/__generated__/output'
import type { TypeFilters } from '@/shared/types/hooks/filters/filters.type'
import type { ChangeEvent } from 'react'

export interface IRequestsFilters {
	categories: SelectOption[]
	regions: SelectOption[]
	filters?: TypeFilters
	toggleFilter: (
		key: keyof TypeFilters,
		value: string,
		isSingle?: boolean
	) => void
	apply: () => void
}

export interface IItemsFilters extends IRequestsFilters {
	changeFilter: (
		key: keyof TypeFilters,
		e: ChangeEvent<HTMLInputElement>
	) => void
}
