import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Page } from 'src/shared/enums/page/page.enum'
import { Status } from 'src/shared/enums/status/status.enum'
import { CategoryService } from '../category/category.service'
import { CATEGORY_SELECT } from '../category/selects/category/category.select'
import { FILTER_CATEGORY_SELECT } from '../category/selects/filter-category/filter-category.select'
import { FaqService } from '../faq/faq.service'
import { PAGE_REGION_SELECT } from '../region/select/page-region/page-region.select'
import { SeoService } from '../seo/seo.service'

@Injectable()
export class PageService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly seoService: SeoService,
		private readonly categoryService: CategoryService,
		private readonly faqService: FaqService
	) {}

	async getHomePage() {
		return this.prisma.$transaction(async (transaction) => {
			const categories = await this.categoryService.getAll(
				transaction,
				CATEGORY_SELECT
			)

			const faqs = await this.faqService.getAll(transaction)

			const allItemRegions = await transaction.item.findMany({
				where: {
					status: Status.PUBLISHED,
				},
				select: {
					region: {
						select: PAGE_REGION_SELECT,
					},
				},
				distinct: ['regionId'],
			})

			const allRequestRegions = await transaction.request.findMany({
				where: {
					status: Status.PUBLISHED,
				},
				select: {
					region: {
						select: PAGE_REGION_SELECT,
					},
				},
				distinct: ['regionId'],
			})

			const itemRegions = allItemRegions.map((item) => ({
				label: item.region.name,
				value: item.region.slug,
			}))

			const requestRegions = allRequestRegions.map((item) => ({
				label: item.region.name,
				value: item.region.slug,
			}))

			const seo = await this.seoService.getSeo(Page.HOME, transaction)

			return {
				categories,
				itemRegions,
				requestRegions,
				faqs,
				seo,
			}
		})
	}

	async getRequestsPage() {
		return this.prisma.$transaction(async (transaction) => {
			const allCategories = await this.categoryService.getAll(
				transaction,
				FILTER_CATEGORY_SELECT
			)

			const requests = await transaction.request.findMany({
				where: {
					status: Status.PUBLISHED,
				},
				select: {
					region: {
						select: PAGE_REGION_SELECT,
					},
				},
				distinct: ['regionId'],
			})

			const regions = requests.map((request) => ({
				label: request.region.name,
				value: request.region.slug,
			}))

			const categories = allCategories.map((category) => ({
				label: category.name,
				value: category.id,
			}))

			const seo = await this.seoService.getSeo(Page.REQUESTS, transaction)

			return {
				categories,
				regions,
				seo,
			}
		})
	}

	async getItemsPage() {
		return this.prisma.$transaction(async (transaction) => {
			const allCategories = await this.categoryService.getAll(
				transaction,
				FILTER_CATEGORY_SELECT
			)

			const items = await transaction.item.findMany({
				where: {
					status: Status.PUBLISHED,
				},
				select: {
					region: {
						select: PAGE_REGION_SELECT,
					},
				},
				distinct: ['regionId'],
			})

			const regions = items.map((item) => ({
				label: item.region.name,
				value: item.region.slug,
			}))

			const categories = allCategories.map((category) => ({
				label: category.name,
				value: category.id,
			}))

			const seo = await this.seoService.getSeo(Page.ITEMS, transaction)

			return {
				categories,
				regions,
				seo,
			}
		})
	}
}
