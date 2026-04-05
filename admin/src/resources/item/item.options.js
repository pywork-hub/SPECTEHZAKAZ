import uploadFeature from '@adminjs/upload'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { UploadProvider } from '../../providers/upload.provider.js'
import { getDate } from '../../utils/helpers/date/get-date.util.js'
import { translit } from '../../utils/helpers/slug/generate-slug.util.js'
import { StatusTranslate } from '../../utils/translate/translate-enum.util.js'

const prisma = new PrismaClient()

export const itemOptions = componentLoader => ({
	options: {
		navigation: { name: 'Каталог', icon: 'Box' },
		label: 'Техника',
		properties: {
			name: { isRequired: true, label: 'Название' },
			promotionExpiredAt: { isVisible: false },
			slug: {
				isVisible: { list: true, show: true, edit: false, filter: true },
			},
			address: { isRequired: true, label: 'Адрес' },
			region: {
				isRequired: true,
				label: 'Регион',
				type: 'reference',
				reference: 'Region',
				isVisible: true,
			},
			description: {
				label: 'Описание',
				isRequired: true,
				type: 'textarea',
				props: {
					rows: 5,
					style: { resize: 'vertical' },
				},
			},
			imagePaths: {
				isVisible: {
					list: true,
					show: true,
					edit: false,
					filter: true,
					type: 'image',
				},
				label: 'Фото товара',
				type: 'string',
				isArray: true,
				props: {
					isImage: true,
					src: record => {
						if (
							!record.params.imagePaths ||
							!Array.isArray(record.params.imagePaths)
						) {
							return '/images/base/no-image.png'
						}
						return record.params.imagePaths || '/images/base/no-image.png'
					},
				},
			},
			imageFiles: {
				isVisible: {
					list: false,
					edit: true,
					show: false,
					filter: false,
				},
				type: 'string',
			},
			averageRating: { isVisible: false },
			hourPrice: {
				label: 'Цена за час',
				isRequired: true,
				type: 'number',
				props: { type: 'number' },
			},
			shiftPrice: {
				label: 'Цена за смену',
				isRequired: true,
				type: 'number',
				props: { type: 'number' },
			},
			minHours: {
				isRequired: true,
				type: 'number',
				props: { type: 'number' },
			},
			properties: {
				type: 'reference',
				isArray: true,
				reference: 'Property',
				model: 'Property',
				label: 'Свойства',
				props: {
					placeholder: 'Выберите свойства',
				},
				isVisible: true,
				availableValues: async () => {
					const allProps = await prisma.property.findMany({
						select: { id: true, value: true },
					})
					return allProps.map(p => ({
						value: p.id.toString(),
						label: p.value,
					}))
				},
			},
			status: { label: 'Статус', availableValues: StatusTranslate },
		},
		actions: {
			list: {
				after: [
					async request => {
						for (const record of request.records) {
							record.params.properties = await prisma.item.findMany({
								where: {
									id: record.params.id,
								},
								include: { properties: {} },
							})
						}
						return request
					},
				],
			},
			show: {
				after: [
					async request => {
						request.record.params.properties = await prisma.item.findMany({
							where: {
								id: request.record.params.id,
							},
							include: { properties: {} },
						})
						return request
					},
				],
			},
			edit: {
				after: [
					async request => {
						return request
					},
				],
			},
			new: {
				before: [
					async request => {
						// const propertyIds = request.payload.properties || [];
						//
						// const connectProperties = propertyIds.map(id => ({
						//     id: parseInt(id),
						// }));
						//
						// request.payload.properties = {
						//     connect: connectProperties
						// };

						if (request.payload.name) {
							request.payload.slug = translit(
								request.payload.name.toLowerCase()
							)
						}

						return request
					},
				],
			},
		},
	},
	features: [
		uploadFeature({
			componentLoader,
			provider: new UploadProvider({
				folder: 'items/images',
				slug: 'item-images',
				resize: {
					width: 150,
					height: 150,
					fit: 'cover',
					position: 'centre',
				},
			}),
			property: 'imagePaths',
			properties: {
				file: 'imageFiles',
				key: 'imagePaths',
				filesToDelete: 'imagePathsToDelete',
			},
			multiple: true,
			validation: {
				mimeTypes: ['image/webp'],
			},
			uploadPath: (record, index) => {
				const key = `/storage/images/items/item-${index}-${uuid()}-${getDate()}.webp`
				if (
					!record.params._uploadKey ||
					!Array.isArray(record.params._uploadKey)
				) {
					record.params._uploadKey = []
				}
				record.params._uploadKey = key

				return key
			},
		}),
	],
})
