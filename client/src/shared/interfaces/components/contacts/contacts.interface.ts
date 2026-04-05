import type { UserContacts } from '@/__generated__/output'
import type { SetStateAction } from 'react'

export interface IContacts {
	isNotOpen?: boolean
	heading: string
	contacts: UserContacts
	setContacts: (value: SetStateAction<UserContacts | null>) => void
}
