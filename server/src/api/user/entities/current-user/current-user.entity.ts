import { Field, Int, ObjectType } from '@nestjs/graphql'
import type { Role as PrismaRole } from '@prisma/client'
import { Role } from 'src/shared/enums/role/role.enum'

@ObjectType()
export class CurrentUser {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => String)
	email: string

	@Field(() => String)
	avatarPath: string

	@Field(() => Role)
	role: PrismaRole
}
