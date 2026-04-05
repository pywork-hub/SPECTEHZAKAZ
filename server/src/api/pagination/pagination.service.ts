import { Injectable } from '@nestjs/common'
import type { PaginationInput } from './input/pagination.input'

@Injectable()
export class PaginationService {
	getPagination({ page, take }: PaginationInput) {
		const skip = (page - 1) * take

		return { take, skip }
	}
}
