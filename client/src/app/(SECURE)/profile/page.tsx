import Profile from '@/components/screens/profile/Profile'
import { NO_INDEX_PAGE } from '@/constants/global/global.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	...NO_INDEX_PAGE,
}

export default function ProfilePage() {
	return <Profile />
}
