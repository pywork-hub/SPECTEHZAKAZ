import { Field, ObjectType } from '@nestjs/graphql'
import { Category } from 'src/api/category/entities/category/category.entity'
import { Faq } from 'src/api/faq/entity/faq.entity'
import { Seo } from 'src/api/seo/entity/seo.entity'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'

@ObjectType()
export class HomePage {
	@Field(() => Seo, { nullable: true })
	seo?: Seo

	@Field(() => [Category])
	categories: Category[]

	@Field(() => [SelectOption])
	itemRegions: SelectOption[]

	@Field(() => [SelectOption])
	requestRegions: SelectOption[]

	@Field(() => [Faq])
	faqs: Faq[]
}
