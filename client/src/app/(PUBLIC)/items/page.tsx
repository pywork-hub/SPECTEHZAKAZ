import { Page } from '@/__generated__/output'
import Items from '@/components/screens/items/Items'
import { useMetadata } from '@/hooks/api/metadata/useMetadata.hook'
import { useItemsPage } from '@/hooks/api/page/useItemsPage.hook'

export async function generateMetadata() {
	const { metadata } = await useMetadata(Page.Items)

	if (!metadata) return null

	return {
		title: metadata.title,
		...(metadata.description && {
			description: metadata.description,
		}),
	}
}

export default async function ItemsPage() {
	const { page } = await useItemsPage()

	return <Items page={page} />
}
