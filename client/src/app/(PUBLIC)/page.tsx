import { Page } from '@/__generated__/output'
import Home from '@/components/screens/home/Home'
import { useMetadata } from '@/hooks/api/metadata/useMetadata.hook'
import { useHomePage } from '@/hooks/api/page/useHomePage.hook'

export async function generateMetadata() {
	const { metadata } = await useMetadata(Page.Home)

	if (!metadata) return

	return {
		title: metadata.title,
		...(metadata.description && {
			description: metadata.description,
		}),
	}
}

export default async function HomePage() {
	const { page } = await useHomePage()

	return <Home page={page} />
}
