import type { TypeAuthState } from '@/shared/types/hooks/auth/auth.type'
import { useState } from 'react'

export const useAuth = () => {
	const [type, setType] = useState<TypeAuthState>(null)

	const isLogin = type === 'login'
	const isRegister = type === 'register'

	const close = () => setType(null)

	return {
		isLogin,
		isRegister,
		type,
		setType,
		close,
	}
}
