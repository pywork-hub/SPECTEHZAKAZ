import type {
	ICurrentUser,
	ICurrentUserLoading,
	ISetCurrentUser,
} from '../../api/user/user.interface'

export interface IUserContext
	extends ICurrentUser,
		ISetCurrentUser,
		ICurrentUserLoading {}
