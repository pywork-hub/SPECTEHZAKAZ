import { Field, ObjectType } from '@nestjs/graphql'
import { SelectOption } from 'src/shared/entities/select-option/select.option.entity'
import { RequestEdit } from '../request-edit/request-edit.entity'

@ObjectType()
export class RequestForEdit {
	@Field(() => RequestEdit, { nullable: true })
	request?: RequestEdit

	@Field(() => [SelectOption])
	categories: SelectOption[]

	@Field(() => [SelectOption])
	regions: SelectOption[]
}
