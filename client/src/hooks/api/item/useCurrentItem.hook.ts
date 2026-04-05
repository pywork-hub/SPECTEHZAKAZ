import {
	type CurrentItemQuery,
	type CurrentItemQueryVariables,
	CurrentItemDocument,
} from '@/__generated__/output'
import { apolloClient } from '@/api/apollo/apollo.client'

export const useCurrentItem = async (id: number) => {
	const { data } = await apolloClient.query<
		CurrentItemQuery,
		CurrentItemQueryVariables
	>({
		query: CurrentItemDocument,
		variables: {
			id,
		},
	})

	return {
		item: data?.currentItem,
	}
}
