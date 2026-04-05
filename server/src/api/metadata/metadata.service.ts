import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Page } from 'src/shared/enums/page/page.enum'
import { METADATA_SELECT } from './select/metadata.select'

@Injectable()
export class MetadataService {
	constructor(private readonly prisma: PrismaService) {}

	async getMetadata(page: Page) {
		return this.prisma.metadata.findUnique({
			where: {
				page,
			},
			select: METADATA_SELECT,
		})
	}
}
