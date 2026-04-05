import { ApolloLink, HttpLink } from '@apollo/client'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { errorLink } from '../error/apollo-error.api'

const removeTypenameLink = removeTypenameFromVariables()

const httpLink = new HttpLink({
	uri: process.env.GRAPHQL_URL as string,
	credentials: 'include',
})

export const apolloLinks = ApolloLink.from([
	removeTypenameLink,
	errorLink,
	httpLink,
])
