import type { PropsWithChildren } from 'react'

export interface IUserProvider extends PropsWithChildren {
	isAuthenticated: boolean
}
