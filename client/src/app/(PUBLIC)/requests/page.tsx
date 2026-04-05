import { Page } from '@/__generated__/output'
import Requests from '@/components/screens/requests/Requests'
import { useMetadata } from '@/hooks/api/metadata/useMetadata.hook'
import { useRequestsPage } from '@/hooks/api/page/useRequestsPage.hook'

export async function generateMetadata() {
	const { metadata } = await useMetadata(Page.Requests)

	if (!metadata) return

	return {
		title: metadata.title,
		...(metadata.description && {
			description: metadata.description,
		}),
	}
}

export default async function RequestsPage() {
	const { page } = await useRequestsPage()

	return <Requests page={page} />
}
