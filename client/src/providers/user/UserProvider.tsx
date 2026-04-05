import { useCurrentUserQuery, type CurrentUser } from '@/__generated__/output'
import { UserContext } from '@/context/user/user.context'
import type { IUserProvider } from '@/shared/interfaces/common/provider/provider.interface'
import { useState } from 'react'

export default function UserProvider({
	children,
	isAuthenticated,
}: IUserProvider) {
	const [user, setUser] = useState<CurrentUser | null>(null)

	const { loading: isLoading } = useCurrentUserQuery({
		onCompleted: ({ currentUser }) => setUser(currentUser),
		onError: () => setUser(null),
		skip: !isAuthenticated,
	})

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
