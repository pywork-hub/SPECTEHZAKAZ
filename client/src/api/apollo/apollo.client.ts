import { IS_SERVER } from '@/constants/global/global.constants'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { apolloLinks } from './links/apollo-links.api'

export const apolloClient = new ApolloClient({
	link: apolloLinks,
	defaultOptions: {
		query: {
			fetchPolicy: 'no-cache',
		},
	},
	credentials: 'include',
	cache: new InMemoryCache({ addTypename: false }),
	ssrMode: IS_SERVER,
})
