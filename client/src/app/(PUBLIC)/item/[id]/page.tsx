import NotFoundPage from '@/app/not-found'
import Item from '@/components/screens/item/Item'
import { useCurrentItem } from '@/hooks/api/item/useCurrentItem.hook'
import type { IIdParams } from '@/shared/interfaces/common/param/param.interface'
import { getCoordinates } from '@/utils/helpers/coordinates/get-coordinates.util'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '',
	description: '',
}

export default async function ItemPage({ params }: IIdParams) {
	const { id } = await params

	if (!id) return <NotFoundPage />

	const { item } = await useCurrentItem(Number(id))

	if (!item) return <NotFoundPage />

	const coordinates = await getCoordinates(item.address)

	return (
		<>
			<link
				rel="stylesheet"
				type="text/css"
				charSet="UTF-8"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
			/>
			<link
				rel="stylesheet"
				type="text/css"
				href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
			/>
			<Item item={item} coordinates={coordinates} />
		</>
	)
}
