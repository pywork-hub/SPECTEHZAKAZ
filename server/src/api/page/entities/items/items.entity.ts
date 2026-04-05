import { Field, ObjectType } from '@nestjs/graphql'
import { Seo } from 'src/api/seo/entity/seo.entity'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'

@ObjectType()
export class ItemsPage {
	@Field(() => [SelectOption])
	categories: SelectOption[]

	@Field(() => [SelectOption])
	regions: SelectOption[]

	@Field(() => Seo, { nullable: true })
	seo?: Seo
}
