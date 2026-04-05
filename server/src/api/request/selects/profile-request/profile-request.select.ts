import { REQUEST_CATEGORY_SELECT } from 'src/api/category/selects/request-category/request-category.select'
import { REQUEST_REGION_SELECT } from 'src/api/region/select/request-region/request-region.select'

export const PROFILE_REQUEST_SELECT = {
	id: true,
	region: {
		select: REQUEST_REGION_SELECT,
	},
	description: true,
	quantity: true,
	startAt: true,
	price: true,
	pricingType: true,
	paymentMethod: true,
	createdAt: true,
	status: true,
	promotionExpiredAt: true,
	category: {
		select: REQUEST_CATEGORY_SELECT,
	},
}
