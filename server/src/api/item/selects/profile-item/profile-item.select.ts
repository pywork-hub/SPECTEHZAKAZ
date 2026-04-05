import { PROPERTY_SELECT } from 'src/api/property/selects/property/property.select'

export const PROFILE_ITEM_SELECT = {
	id: true,
	name: true,
	address: true,
	imagePaths: true,
	hourPrice: true,
	shiftPrice: true,
	minHours: true,
	status: true,
	createdAt: true,
	promotionExpiredAt: true,
	properties: {
		select: PROPERTY_SELECT,
	},
}
