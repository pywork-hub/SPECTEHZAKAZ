import { registerEnumType } from '@nestjs/graphql'

export enum Status {
	UNDER_REVIEW = 'UNDER_REVIEW',
	PUBLISHED = 'PUBLISHED',
	CANCELED = 'CANCELED',
}

registerEnumType(Status, {
	name: 'Status',
})
