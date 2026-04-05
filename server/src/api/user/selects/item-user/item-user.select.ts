import { USER_CONTACTS_SELECT } from '../user-contacts/user-contacts.select'

export const ITEM_USER_SELECT = {
	createdAt: true,
	name: true,
	avatarPath: true,
	...USER_CONTACTS_SELECT,
}
