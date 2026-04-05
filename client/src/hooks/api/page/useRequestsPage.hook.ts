import {
	type RequestsPageQuery,
	type RequestsPageQueryVariables,
	RequestsPageDocument,
} from '@/__generated__/output'
import { apolloClient } from '@/api/apollo/apollo.client'

export const useRequestsPage = async () => {
	const { data } = await apolloClient.query<
		RequestsPageQuery,
		RequestsPageQueryVariables
	>({
		query: RequestsPageDocument,
	})

	return {
		page: data.requestsPage,
	}
}
