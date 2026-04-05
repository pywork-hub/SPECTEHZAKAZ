import { IS_SERVER } from '@/constants/global/global.constants'
import { onError } from '@apollo/client/link/error'
import toast from 'react-hot-toast'

export const errorLink = onError(({ graphQLErrors }) => {
	if (graphQLErrors && !IS_SERVER) {
		graphQLErrors.forEach(({ message }) => toast.error(message))
	}
})
