import { Field, ObjectType } from '@nestjs/graphql'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'

@ObjectType()
export class CategoryAttribute {
	@Field(() => String)
	name: string

	@Field(() => [SelectOption])
	properties: SelectOption[]
}
