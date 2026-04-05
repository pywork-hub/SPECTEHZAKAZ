import uploadFeature from '@adminjs/upload'
import { PrismaClient } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { UploadProvider } from '../../providers/upload.provider.js'
import { getDate } from '../../utils/helpers/date/get-date.util.js'
import { translit } from '../../utils/helpers/slug/generate-slug.util.js'

const prisma = new PrismaClient()

export const categoryOptions = componentLoader => ({
	options: {
		navigation: { name: 'Настройки сайта', icon: 'List' },
		label: 'Категории',
		properties: {
			slug: {
				isVisible: { list: true, show: true, edit: false, filter: true },
			},

			imageFile: {
				isVisible: { list: false, edit: true, show: false, filter: false },
				type: 'string',
			},
			imagePath: {
				label: 'Изображение',
				props: {
					isImage: true,
					src: record => record.params.imagePath || '/images/base/no-image.png',
				},
				components: {
					edit: componentLoader.UploadEditComponent,
					list: componentLoader.UploadListComponent,
					show: componentLoader.UploadShowComponent,
				},
			},

			iconFile: {
				isVisible: { list: false, edit: true, show: false, filter: false },
				type: 'string',
			},
			iconPath: {
				label: 'Иконка',
				props: {
					isImage: true,
					src: record => record.params.iconPath || '/images/base/no-icon.png',
				},
				components: {
					edit: componentLoader.UploadEditComponent,
					list: componentLoader.UploadListComponent,
					show: componentLoader.UploadShowComponent,
				},
			},

			attributes: {
				type: 'reference',
				isArray: true,
				reference: 'Attribute',
				model: 'Attribute',
				isVisible: true,
			},
		},
		editProperties: ['name', 'imageFile', 'iconFile', 'attributes'],
		showProperties: ['id', 'name', 'imagePath', 'iconPath', 'attributes'],
		actions: {
			list: {
				after: [
					async request => {
						for (const record of request.records) {
							const categoryWithAttributes = await prisma.category.findUnique({
								where: { id: record.id },
								include: { attributes: {} },
							})
							record.params.imagePath = categoryWithAttributes.imagePath
							record.params.iconPath = categoryWithAttributes.iconPath
							record.params.attributes = categoryWithAttributes.attributes
						}
						return request
					},
				],
			},
			show: {
				after: [
					async request => {
						const categoryWithAttributes = await prisma.category.findUnique({
							where: { id: request.record.params.id },
							include: { attributes: {} },
						})
						request.record.params.imagePath = categoryWithAttributes.imagePath
						request.record.params.iconPath = categoryWithAttributes.iconPath
						request.record.params.attributes = categoryWithAttributes.attributes
						return request
					},
				],
			},
			new: {
				before: [
					async request => {
						delete request.params.id
						if (request.payload.name) {
							request.payload.slug = translit(
								request.payload.name.toLowerCase()
							)
						}

						// Если файл не выбран — оставляем как есть
						if (
							!request.payload.imageFile ||
							request.payload.imageFile === '__FORM_VALUE_NULL__'
						) {
							request.payload.imagePath = '/images/base/no-image.png'
						}

						if (
							!request.payload.iconFile ||
							request.payload.iconFile === '__FORM_VALUE_NULL__'
						) {
							request.payload.iconPath = '/images/base/no-icon.png'
						}

						return request
					},
				],
				after: [
					async request => {
						const params = flattenObject(request.record.params)

						const id = params.id

						for (const attribute of params.attributes) {
							await prisma.$executeRaw`insert into "_category_attribute_relation" ("A", "B") values (${attribute}, ${id})`
						}

						return request
					},
				],
			},
			edit: {
				before: [
					async request => {
						if (request.payload.name) {
							request.payload.slug = translit(
								request.payload.name.toLowerCase()
							)
						}

						// Обработка удаления/обновления изображений
						if (request.payload.imageFile === '__FORM_VALUE_NULL__') {
							request.payload.imagePath = '/images/base/no-image.png'
						}

						if (request.payload.iconFile === '__FORM_VALUE_NULL__') {
							request.payload.iconPath = '/images/base/no-icon.png'
						}
						console.log('PAYLOAD: ', request.payload)

						console.log('RECORDS: ', request.records)

						return request
					},
				],
				after: [
					async request => {
						const categoryWithAttributes = await prisma.category.findUnique({
							where: { id: request.record.params.id },
							include: { attributes: true },
						})

						request.record.params.attributes = categoryWithAttributes.attributes

						return request
					},
				],
				handler: async (request, response, context) => {
					const { record, currentAdmin } = context
					const { payload } = request

					if (Object.keys(payload).length !== 0) {
						const params = flattenObject(payload)

						const id = params.id

						await prisma.$queryRaw`delete from "_category_attribute_relation" where "B"=${Number(
							id
						)}`

						for (const attribute of params.attributes) {
							await prisma.$executeRaw`insert into "_category_attribute_relation" ("A", "B") values (${Number(
								attribute
							)}, ${Number(id)})`
						}
					}

					return {
						record: record.toJSON(currentAdmin),
						redirectUrl: context.h.resourceUrl({ resourceId: 'Category' }),
					}
				},
			},
		},
	},
	features: [
		uploadFeature({
			componentLoader,
			provider: new UploadProvider({
				folder: 'categories/images',
				resize: {
					width: 150,
					height: 150,
					fit: 'cover',
					position: 'centre',
				},
			}),
			property: 'imagePath',
			properties: {
				filePath: 'imageFilePath',
				file: 'imageFile', // ← имя виртуального поля для загрузки
				key: 'imagePath', // ← поле в БД, куда сохраняется путь
				filesToDelete: 'imageFilesToDelete', // ← уникальное имя для удаления
			},
			validation: { mimeTypes: ['image/webp'] },
			uploadPath: record => {
				const key = `/storage/images/categories/category-image-${uuid()}-${getDate()}.webp`
				record.params._uploadKey = key
				return key
			},
		}),

		uploadFeature({
			componentLoader,
			provider: new UploadProvider({
				folder: 'categories/icons',
				resize: {
					width: 150,
					height: 150,
					fit: 'cover',
					position: 'centre',
				},
			}),
			property: 'iconPath',
			properties: {
				file: 'iconFile', // ← другое виртуальное поле
				key: 'iconPath', // ← другое поле в БД
				filesToDelete: 'iconFilesToDelete', // ← уникальное для иконок
			},
			validation: { mimeTypes: ['image/webp'] },
			uploadPath: record => {
				const key = `/storage/images/categories/category-icon-${uuid()}-${getDate()}.webp`
				record.params._uploadKey = key
				return key
			},
		}),
	],
})

function flattenObject(obj) {
	const result = {}
	const attributeKeys = Object.keys(obj).filter(k =>
		k.startsWith('attributes.')
	)
	const otherKeys = Object.keys(obj).filter(k => !k.startsWith('attributes.'))

	// Добавляем остальные поля
	for (const key of otherKeys) {
		result[key] = obj[key]
	}

	// Если есть атрибуты — собираем их в массив
	if (attributeKeys.length > 0) {
		result.attributes = attributeKeys
			.sort((a, b) => {
				const aIndex = parseInt(a.split('.')[1])
				const bIndex = parseInt(b.split('.')[1])
				return aIndex - bIndex
			})
			.map(key => parseInt(obj[key]))
	}

	return result
}
