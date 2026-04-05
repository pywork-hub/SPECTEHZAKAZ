import { USER_CONTACTS_SELECT } from '../user-contacts/user-contacts.select'

export const PROFILE_SELECT = {
	id: true,
	name: true,
	email: true,
	avatarPath: true,
	...USER_CONTACTS_SELECT,
	createdAt: true,
	_count: {
		select: {
			items: true,
			requests: true,
		},
	},
}
