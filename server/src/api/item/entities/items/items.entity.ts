import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Item } from '../item/item.entity'

@ObjectType()
export class Items {
	@Field(() => [Item])
	items: Item[]

	@Field(() => Int)
	pages: number
}
