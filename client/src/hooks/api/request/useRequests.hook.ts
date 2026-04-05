import { type UserContacts, useRequestsQuery } from '@/__generated__/output'
import { useFilters } from '@/hooks/components/filters/useFilters.hook'
import { usePagination } from '@/hooks/components/pagination/usePagination.hook'
import { useQueryParams } from '@/hooks/helpers/query-params/useQueryParams.hook'
import { useEffect, useState } from 'react'

export const useRequests = () => {
	const [contacts, setContacts] = useState<UserContacts | null>(null)

	const { filters, setFilters, toggleFilter } = useFilters()

	const [appliedFilters, setAppliedFilters] = useState(filters)

	const { pushParams, getParams } = useQueryParams({
		keys: ['categories', 'regions'],
	})

	const applyFilters = () => {
		setAppliedFilters(filters)

		pushParams(filters)
	}

	const pagination = usePagination()

	const { data, loading, error } = useRequestsQuery({
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
		applyFilters,
		pagination,
		requests: data?.requests.requests || [],
		pages: data?.requests.pages || 1,
		isLoading: loading || !!error,
	}
}
