import { Module } from '@nestjs/common'
import { CategoryService } from '../category/category.service'
import { FaqService } from '../faq/faq.service'
import { RequestService } from '../request/request.service'
import { SeoService } from '../seo/seo.service'
import { PageResolver } from './page.resolver'
import { PageService } from './page.service'

@Module({
	providers: [
		PageResolver,
		PageService,
		SeoService,
		CategoryService,
		RequestService,
		FaqService,
	],
})
export class PageModule {}
