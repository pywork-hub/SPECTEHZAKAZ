import { getModelByName } from '@adminjs/prisma'
import { attributeOptions } from './attribute/attribute.options.js'
import { categoryOptions } from './category/category.options.js'
import { faqOptions } from './faq/faq.options.js'
import { itemOptions } from './item/item.options.js'
import { metadataOptions } from './metadata/metadata.options.js'
import { propertyOptions } from './property/property.options.js'
import { regionOptions } from './region/region.options.js'
import { requestOptions } from './request/request.options.js'
import { reviewOptions } from './review/review.options.js'
import { seoOptions } from './seo/seo.options.js'
import { userOptions } from './user/user.options.js'

export const getResources = (prisma, componentLoader) => [
	{
		resource: { model: getModelByName('User'), client: prisma },
		...userOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Item'), client: prisma },
		...itemOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Request'), client: prisma },
		...requestOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Category'), client: prisma },
		...categoryOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Region'), client: prisma },
		...regionOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Faq'), client: prisma },
		...faqOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Review'), client: prisma },
		...reviewOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Seo'), client: prisma },
		...seoOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Metadata'), client: prisma },
		...metadataOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Attribute'), client: prisma },
		...attributeOptions(componentLoader),
	},
	{
		resource: { model: getModelByName('Property'), client: prisma },
		...propertyOptions(componentLoader),
	},
]
