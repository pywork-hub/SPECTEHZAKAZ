import { registerEnumType } from '@nestjs/graphql'

export enum Sort {
	DESC = 'DESC',
	ASC = 'ASC',
}

registerEnumType(Sort, {
	name: 'Sort',
})
