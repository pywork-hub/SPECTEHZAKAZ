import { PRIVACY_POLICY_DATA } from '@/base/policies/privacy/privacy-policy.data'
import Policy from '@/components/screens/policy/Policy'
import { NO_INDEX_PAGE } from '@/constants/global/global.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Политика конфиденциальности',
	...NO_INDEX_PAGE,
}

export default function PrivacyPolicyPage() {
	return <Policy {...PRIVACY_POLICY_DATA} />
}
