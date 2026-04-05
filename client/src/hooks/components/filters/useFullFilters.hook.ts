import type { TypeFilters } from '@/shared/types/hooks/filters/filters.type'
import type { ChangeEvent } from 'react'
import { useFilters } from './useFilters.hook'

export const useFullFilters = () => {
	const { filters, setFilters, toggleFilter } = useFilters()

	const changeFilter = (
		key: keyof TypeFilters,
		{ target }: ChangeEvent<HTMLInputElement>
	) => {
		let value = target.value

		if (!/^\d*$/.test(value)) return

		if (value.startsWith('0') && value.length > 1) return

		setFilters((prev) => ({
			...prev,
			[key]: value,
		}))
	}

	return {
		filters,
		setFilters,
		toggleFilter,
		changeFilter,
	}
}
