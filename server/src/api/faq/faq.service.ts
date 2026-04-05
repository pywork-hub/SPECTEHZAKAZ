import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { FAQ_SELECT } from './select/faq.select'

@Injectable()
export class FaqService {
	async getAll(transaction: Prisma.TransactionClient) {
		return transaction.faq.findMany({
			orderBy: {
				order: 'asc',
			},
			select: FAQ_SELECT,
		})
	}
}
