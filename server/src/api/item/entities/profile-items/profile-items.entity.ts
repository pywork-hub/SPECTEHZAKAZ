import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProfileItem } from '../profile-item/profile-item.entity'

@ObjectType()
export class ProfileItems {
	@Field(() => [ProfileItem])
	items: ProfileItem[]

	@Field(() => Int)
	pages: number
}
