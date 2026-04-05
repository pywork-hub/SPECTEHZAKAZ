import type { IUserContext } from '@/shared/interfaces/common/context/context.interface'
import { createContext, useContext } from 'react'

export const UserContext = createContext<IUserContext>({
	user: null,
	setUser: () => {},
	isLoading: false,
})

export const useUser = () => useContext(UserContext)
