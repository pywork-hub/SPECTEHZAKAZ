import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Request } from '../request/request.entity'

@ObjectType()
export class Requests {
	@Field(() => [Request])
	requests: Request[]

	@Field(() => Int)
	pages: number
}
