import type { CurrentUser, Profile } from '@/__generated__/output'
import type { Dispatch, SetStateAction } from 'react'

export interface ICurrentUser {
	user: CurrentUser | null
}

export interface ICurrentUserExist {
	user: CurrentUser
}

export interface ISetCurrentUser {
	setUser: Dispatch<SetStateAction<CurrentUser | null>>
}

export interface ICurrentUserLoading {
	isLoading: boolean
}

export interface IProfile {
	profile: Profile
}
