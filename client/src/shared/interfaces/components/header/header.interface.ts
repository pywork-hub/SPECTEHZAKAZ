import type {
	ICurrentUserExist,
	ISetCurrentUser,
} from '../../api/user/user.interface'

export interface IHeaderUser extends ICurrentUserExist, ISetCurrentUser {
	onClick?: () => void
}

export interface IHeaderNavigation {
	onClick?: () => void
}
