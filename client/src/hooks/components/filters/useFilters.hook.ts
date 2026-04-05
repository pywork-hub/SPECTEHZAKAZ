import type { TypeFilters } from '@/shared/types/hooks/filters/filters.type'
import { useState } from 'react'

export const useFilters = () => {
	const [filters, setFilters] = useState<TypeFilters>()

	const toggleFilter = (
		key: keyof TypeFilters,
		value: string,
		isSingle?: boolean
	) => {
		setFilters((prev) => {
			if (isSingle) {
				return { ...prev, [key]: value ? value : undefined }
			} else {
				const currentValues = prev?.[key] || []
				const updatedValues = new Set(currentValues)

				if (updatedValues.has(value)) {
					updatedValues.delete(value)
				} else {
					updatedValues.add(value)
				}

				return { ...prev, [key]: [...updatedValues] }
			}
		})
	}

	return {
		filters,
		setFilters,
		toggleFilter,
	}
}
