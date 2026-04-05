import Contacts from '@/components/screens/contacts/Contacts'
import { NO_INDEX_PAGE } from '@/constants/global/global.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	...NO_INDEX_PAGE
}

export default function ContactsPage() {
	return <Contacts />
}
