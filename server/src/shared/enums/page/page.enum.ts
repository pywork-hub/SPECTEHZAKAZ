import { registerEnumType } from '@nestjs/graphql'

export enum Page {
	HOME = 'HOME',
	REQUESTS = 'REQUESTS',
	ITEMS = 'ITEMS',
}

registerEnumType(Page, {
	name: 'Page',
})
