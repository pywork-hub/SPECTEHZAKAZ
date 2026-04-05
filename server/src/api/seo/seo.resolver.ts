import { Args, Query, Resolver } from '@nestjs/graphql'
import { Page } from 'src/shared/enums/page/page.enum'
import { Seo } from './entity/seo.entity'
import { SeoService } from './seo.service'

@Resolver()
export class SeoResolver {
	constructor(private readonly seoService: SeoService) {}

	@Query(() => Seo, { name: 'seo', nullable: true })
	async getSeo(@Args('page', { type: () => Page }) page: Page) {
		return this.seoService.getSeo(page)
	}
}
