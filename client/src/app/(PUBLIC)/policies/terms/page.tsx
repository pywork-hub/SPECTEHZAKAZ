import { TERMS_POLICY_DATA } from '@/base/policies/terms/terms.data'
import Policy from '@/components/screens/policy/Policy'
import { NO_INDEX_PAGE } from '@/constants/global/global.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: `Пользовательское соглашение`,
	...NO_INDEX_PAGE,
}

export default function TermsPolicyPage() {
	return <Policy {...TERMS_POLICY_DATA} />
}
