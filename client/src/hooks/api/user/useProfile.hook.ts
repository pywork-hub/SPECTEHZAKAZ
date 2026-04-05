import {
	useProfileItemsQuery,
	useProfileQuery,
	useProfileRequestsQuery,
} from '@/__generated__/output'
import { usePagination } from '@/hooks/components/pagination/usePagination.hook'
import { useState } from 'react'

export const useProfile = () => {
	const [isItems, setIsItems] = useState(false)

	const { reset, ...pagination } = usePagination()

	const {
		data: profileData,
		loading: profileLoading,
		error: profileError,
	} = useProfileQuery({
		fetchPolicy: 'no-cache',
	})

	const {
		data: requestsData,
		loading: requestsLoading,
		error: requestsError,
	} = useProfileRequestsQuery({
		fetchPolicy: 'no-cache',
		skip: isItems,
		variables: {
			pagination: {
				page: pagination.page,
				take: 10,
			},
		},
	})

	const {
		data: itemsData,
		loading: itemsLoading,
		error: itemsError,
	} = useProfileItemsQuery({
		fetchPolicy: 'no-cache',
		skip: !isItems,
		variables: {
			pagination: {
				page: pagination.page,
				take: 10,
			},
		},
	})

	const toggleTab = () => {
		reset()

		setIsItems(!isItems)
	}

	return {
		isItems,
		profile: profileData?.profile,
		requests: requestsData?.profileRequests.requests || [],
		requestsPages: requestsData?.profileRequests.pages || 0,
		items: itemsData?.profileItems.items || [],
		itemsPages: itemsData?.profileItems.pages || 0,
		isLoading:
			requestsLoading || itemsLoading || !!requestsError || !!itemsError,
		isProfileLoading: profileLoading || !!profileError,
		toggleTab,
		pagination,
	}
}
