import { Injectable } from '@nestjs/common'
import type { ItemsFiltersInput } from '../item/inputs/filters/items-filters.input'
import type { RequestsFiltersInput } from '../request/inputs/filters/requests-filters.input'

@Injectable()
export class FilterService {
	getRequestsFilters(input: RequestsFiltersInput) {
		const filters: Record<string, any> = {}

		if (input?.categories?.length > 0) {
			filters.categoryId = {
				in: input.categories.map((category) => Number(category)),
			}
		}

		if (input?.regions?.length > 0) {
			filters.region = { is: { slug: { in: input.regions } } }
		}

		if (input?.paymentMethod) {
			filters.paymentMethod = input.paymentMethod
		}

		return filters
	}

	getItemsFilters(input: ItemsFiltersInput) {
		const filters: Record<string, any> = {}

		if (input.categories?.length > 0) {
			filters.categoryId = {
				in: input.categories.map((category) => Number(category)),
			}
		}

		if (input.regions?.length > 0) {
			filters.region = { is: { slug: { in: input.regions } } }
		}

		if (input.minHourPrice || input.maxHourPrice) {
			filters.hourPrice = {}
			if (input.minHourPrice) {
				filters.hourPrice.gte = Number(input.minHourPrice)
			}
			if (input.maxHourPrice) {
				filters.hourPrice.lte = Number(input.maxHourPrice)
			}
		}

		if (input.minShiftPrice || input.maxShiftPrice) {
			filters.shiftPrice = {}
			if (input.minShiftPrice) {
				filters.shiftPrice.gte = Number(input.minShiftPrice)
			}
			if (input.maxShiftPrice) {
				filters.shiftPrice.lte = Number(input.maxShiftPrice)
			}
		}

		let orderBy: any[] = [
			{
				promotionExpiredAt: {
					sort: 'desc',
					nulls: 'last',
				},
			},
			{
				createdAt: 'desc',
			},
		]

		if (input.ratingSort) {
			orderBy.push({ averageRating: input.ratingSort.toLowerCase() })
		}

		if (input.priceSort) {
			orderBy.push({ hourPrice: input.priceSort.toLowerCase() })
		}

		if (input.createdAtSort) {
			const createdAtIndex = orderBy.findIndex((obj) => 'createdAt' in obj)
			if (createdAtIndex !== -1) {
				orderBy[createdAtIndex] = {
					createdAt: input.createdAtSort.toLowerCase(),
				}
			} else {
				orderBy.push({ createdAt: input.createdAtSort.toLowerCase() })
			}
		}

		return {
			where: filters,
			orderBy,
		}
	}
}
