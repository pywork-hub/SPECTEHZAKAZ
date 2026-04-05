import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

export const attributeOptions = componentLoader => ({
	options: {
		editProperties: ['name', 'properties'],
		showProperties: ['id', 'name', 'properties'],
		navigation: { name: 'Каталог', icon: 'Sliders' },
		label: 'Атрибуты',
		properties: {
			properties: {
				type: 'reference',
				isArray: true,
				reference: 'Property',
				model: 'Property',
				label: 'Свойства',
				props: {
					placeholder: 'Выберите свойства',
					type: 'string',
					required: true,
					value: 'name',
				},
				isVisible: true,
			},
		},
		actions: {
			list: {
				after: [
					async request => {
						for (const record of request.records) {
							record.params.properties = await prisma.property.findMany({
								where: {
									attributeId: record.params.id,
								},
							})
						}
						return request
					},
				],
			},
			show: {
				after: [
					async response => {
						const properties = await prisma.property.findMany({
							where: {
								attributeId: response.record.params.id,
							},
						})
						const res = []
						properties.forEach(property => {
							res.push({
								id: property.id,
								title: property.value,
								label: property.value,
								value: property.value,
							})
						})
						response.record.params.properties = res
						return response
					},
				],
			},
			edit: {
				after: [
					async response => {
						const properties = await prisma.property.findMany({
							where: {
								attributeId: response.record.params.id,
							},
						})
						const res = []
						properties.forEach(property => {
							res.push({
								id: property.id,
								title: property.value,
								label: property.value,
								value: property.value,
							})
						})
						response.record.params.properties = res
						return response
					},
				],
			},
		},
	},
})
