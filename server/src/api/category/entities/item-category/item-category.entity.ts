import { Field, ObjectType } from '@nestjs/graphql'
import { CategoryAttribute } from 'src/api/attribute/entities/category-attribute/category-attribute.entity'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'

@ObjectType()
export class ItemCategory extends SelectOption {
	@Field(() => [CategoryAttribute])
	attributes: CategoryAttribute[]
}
