import {
	type ItemsPageQuery,
	type ItemsPageQueryVariables,
	ItemsPageDocument,
} from '@/__generated__/output'
import { apolloClient } from '@/api/apollo/apollo.client'

export const useItemsPage = async () => {
	const { data } = await apolloClient.query<
		ItemsPageQuery,
		ItemsPageQueryVariables
	>({
		query: ItemsPageDocument,
	})

	return {
		page: data.itemsPage,
	}
}
