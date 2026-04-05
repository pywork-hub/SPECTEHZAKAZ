import { Args, Query, Resolver } from '@nestjs/graphql'
import { Page } from 'src/shared/enums/page/page.enum'
import { Metadata } from './entity/metadata.entity'
import { MetadataService } from './metadata.service'

@Resolver()
export class MetadataResolver {
	constructor(private readonly metadataService: MetadataService) {}

	@Query(() => Metadata, { name: 'metadata', nullable: true })
	async getMetadata(@Args('page', { type: () => Page }) page: Page) {
		return this.metadataService.getMetadata(page)
	}
}
