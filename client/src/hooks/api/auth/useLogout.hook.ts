import { useLogoutMutation } from '@/__generated__/output'
import { PUBLIC_ROUTE, SECURE_ROUTE } from '@/constants/route/route.constants'
import { AUTH_ERROR } from '@/notifications/errors/auth/auth.error'
import type { ISetCurrentUser } from '@/shared/interfaces/api/user/user.interface'

export const useLogout = ({ setUser }: ISetCurrentUser) => {
	const [logoutMutation, { loading }] = useLogoutMutation({
		fetchPolicy: 'no-cache',
		onCompleted: ({ logout }) => {
			if (!logout) return AUTH_ERROR.LOGOUT()

			setUser(null)

			const securePaths = Object.values(SECURE_ROUTE)

			if (securePaths.some((path) => window.location.pathname.includes(path))) {
				window.location.replace(PUBLIC_ROUTE.HOME)
			}
		},
	})

	const logout = () => logoutMutation()

	return {
		logout,
		isLoading: loading,
	}
}
