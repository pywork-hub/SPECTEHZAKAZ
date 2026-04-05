import { Field, ObjectType } from '@nestjs/graphql'
import { ItemCategory } from 'src/api/category/entities/item-category/item-category.entity'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'
import { ItemEdit } from '../item-edit/item-edit.entity'

@ObjectType()
export class ItemForEdit {
	@Field(() => ItemEdit, { nullable: true })
	item?: ItemEdit

	@Field(() => [ItemCategory])
	categories: ItemCategory[]

	@Field(() => [SelectOption])
	regions: SelectOption[]
}
