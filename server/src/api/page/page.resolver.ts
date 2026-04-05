import { Query, Resolver } from '@nestjs/graphql'
import { HomePage } from './entities/home/home.entity'
import { RequestsPage } from './entities/requests/requests.entity'
import { PageService } from './page.service'
import { ItemsPage } from './entities/items/items.entity'

@Resolver()
export class PageResolver {
	constructor(private readonly pageService: PageService) {}

	@Query(() => HomePage, { name: 'homePage' })
	async getHomePage() {
		return this.pageService.getHomePage()
	}

	@Query(() => RequestsPage, { name: 'requestsPage' })
	async getRequestsPage() {
		return this.pageService.getRequestsPage()
	}

	@Query(() => ItemsPage, { name: 'itemsPage' })
	async getItemsPage() {
		return this.pageService.getItemsPage()
	}
}
