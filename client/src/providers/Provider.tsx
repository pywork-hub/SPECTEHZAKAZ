'use client'

import { apolloClient } from '@/api/apollo/apollo.client'
import Toaster from '@/components/templates/toaster/Toaster'
import { IS_PRODUCTION } from '@/constants/global/global.constants'
import type { IUserProvider } from '@/shared/interfaces/common/provider/provider.interface'
import { ApolloProvider } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import UserProvider from './user/UserProvider'

if (!IS_PRODUCTION) {
	loadDevMessages()
	loadErrorMessages()
}

export default function Provider({
	children,
	isAuthenticated,
}: IUserProvider) {
	return (
		<>
			<ApolloProvider client={apolloClient}>
				<UserProvider isAuthenticated={isAuthenticated}>
					{children}
				</UserProvider>
			</ApolloProvider>
			<Toaster />
		</>
	)
}
