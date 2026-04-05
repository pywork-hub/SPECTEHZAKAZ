import type { TypeAuthState } from '@/shared/types/hooks/auth/auth.type'
import type { Dispatch, SetStateAction } from 'react'

export interface IAuth {
	isLogin: boolean
	isRegister: boolean
	setType: Dispatch<SetStateAction<TypeAuthState>>
	close: () => void
}

export interface IAuthState {
	setType: Dispatch<SetStateAction<TypeAuthState>>
}
