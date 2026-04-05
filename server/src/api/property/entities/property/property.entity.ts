import { Field, ObjectType } from '@nestjs/graphql'
import { Attribute } from 'src/api/attribute/entities/attribute/attribute.entity'

@ObjectType()
export class Property {
	@Field(() => String)
	value: string

	@Field(() => Attribute)
	attribute: Attribute
}
