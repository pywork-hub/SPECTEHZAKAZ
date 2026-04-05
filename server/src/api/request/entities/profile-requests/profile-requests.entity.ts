import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ProfileRequest } from '../profile-request/profile-request.entity'

@ObjectType()
export class ProfileRequests {
	@Field(() => [ProfileRequest])
	requests: ProfileRequest[]

	@Field(() => Int)
	pages: number
}
