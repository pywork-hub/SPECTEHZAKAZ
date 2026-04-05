import { useReviewsQuery } from '@/__generated__/output'
import { usePagination } from '@/hooks/components/pagination/usePagination.hook'
import type { ICurrentItem } from '@/shared/interfaces/api/item/item.interface'

export const useReviews = ({ item }: ICurrentItem) => {
	const { reset, ...pagination } = usePagination()

	const { data, loading, error } = useReviewsQuery({
		fetchPolicy: 'no-cache',
		variables: {
			filters: {
				itemId: item.id,
				pagination: {
					take: 5,
					page: pagination.page,
				},
			},
		},
	})

	return {
		reviews: data?.reviews.reviews || [],
		pages: data?.reviews.pages || 1,
		isReviewsLoading: loading || !!error,
		pagination,
	}
}
