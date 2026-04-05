import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { Page } from 'src/shared/enums/page/page.enum'
import { SEO_SELECT } from './select/seo.select'

@Injectable()
export class SeoService {
	constructor(private readonly prisma: PrismaService) {}

	async getSeo(page: Page, transaction?: Prisma.TransactionClient) {
		const database = transaction ?? this.prisma

		return database.seo.findUnique({
			where: { page },
			select: SEO_SELECT,
		})
	}
}
