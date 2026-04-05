import { USER_CONTACTS_SELECT } from '../user-contacts/user-contacts.select'

export const PROFILE_EDIT_SELECT = {
	name: true,
	email: true,
	avatarPath: true,
	...USER_CONTACTS_SELECT,
}
