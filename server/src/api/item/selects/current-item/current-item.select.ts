import { PROPERTY_SELECT } from 'src/api/property/selects/property/property.select'
import { ITEM_USER_SELECT } from 'src/api/user/selects/item-user/item-user.select'
import { Status } from 'src/shared/enums/status/status.enum'

export const CURRENT_ITEM_SELECT = {
	id: true,
	name: true,
	address: true,
	description: true,
	imagePaths: true,
	hourPrice: true,
	shiftPrice: true,
	minHours: true,
	averageRating: true,
	properties: {
		select: PROPERTY_SELECT,
	},
	user: {
		select: {
			...ITEM_USER_SELECT,
			_count: {
				select: {
					items: true,
				},
			},
		},
	},
	_count: {
		select: {
			reviews: {
				where: {
					status: Status.PUBLISHED,
				},
			},
		},
	},
}
