import {
	type MetadataQuery,
	type MetadataQueryVariables,
	type Page,
	MetadataDocument,
} from '@/__generated__/output'
import { apolloClient } from '@/api/apollo/apollo.client'

export const useMetadata = async (page: Page) => {
	const { data } = await apolloClient.query<
		MetadataQuery,
		MetadataQueryVariables
	>({
		query: MetadataDocument,
		variables: {
			page,
		},
	})

	return {
		metadata: data.metadata,
	}
}
