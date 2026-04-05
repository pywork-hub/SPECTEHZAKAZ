import { REQUEST_CATEGORY_SELECT } from 'src/api/category/selects/request-category/request-category.select'
import { REQUEST_REGION_SELECT } from 'src/api/region/select/request-region/request-region.select'
import { USER_CONTACTS_SELECT } from 'src/api/user/selects/user-contacts/user-contacts.select'

export const REQUEST_SELECT = {
	id: true,
	region: {
		select: REQUEST_REGION_SELECT,
	},
	description: true,
	phone: true,
	quantity: true,
	startAt: true,
	price: true,
	pricingType: true,
	paymentMethod: true,
	createdAt: true,
	category: {
		select: REQUEST_CATEGORY_SELECT,
	},
	user: {
		select: USER_CONTACTS_SELECT,
	},
}
