import type { PropsWithChildren } from 'react'
import type { ISetCurrentUser } from '../../api/user/user.interface'
import type { IClassName } from '../../common/class-name/class-name.interface'

export interface ILogout
	extends ISetCurrentUser,
		PropsWithChildren<IClassName> {}
