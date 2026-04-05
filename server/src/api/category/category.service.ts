import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(
		transaction: Prisma.TransactionClient,
		select: Prisma.CategorySelect
	) {
		return transaction.category.findMany({
			select,
			orderBy: {
				id: 'asc',
			},
		})
	}
}
