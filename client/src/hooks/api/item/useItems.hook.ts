import { useItemsQuery, type UserContacts } from '@/__generated__/output'
import { useFullFilters } from '@/hooks/components/filters/useFullFilters.hook'
import { usePagination } from '@/hooks/components/pagination/usePagination.hook'
import { useQueryParams } from '@/hooks/helpers/query-params/useQueryParams.hook'
import { useEffect, useState } from 'react'

export const useItems = () => {
	const [contacts, setContacts] = useState<UserContacts | null>(null)

	const { filters, setFilters, toggleFilter, changeFilter } = useFullFilters()

	const [appliedFilters, setAppliedFilters] = useState(filters)

	const { pushParams, getParams } = useQueryParams({
		keys: ['categories', 'regions'],
	})

	const applyFilters = () => {
		setAppliedFilters(filters)

		pushParams(filters)
	}

	const pagination = usePagination()

	const { data, loading, error } = useItemsQuery({
		fetchPolicy: 'no-cache',
		variables: {
			filters: {
				pagination: {
					page: pagination.page,
					take: 10,
				},
				...appliedFilters,
			},
		},
	})

	useEffect(() => {
		const filters = getParams()

		setFilters(filters)
		setAppliedFilters(filters)
	}, [])

	return {
		contacts,
		setContacts,
		filters,
		toggleFilter,
		changeFilter,
		applyFilters,
		pagination,
		items: data?.items.items || [],
		pages: data?.items.pages || 1,
		isLoading: loading || !!error,
	}
}
