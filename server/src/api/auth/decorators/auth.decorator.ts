import { UseGuards, applyDecorators } from '@nestjs/common'
import { Role } from 'src/shared/enums/role/role.enum'
import { OnlyAdminGuard } from '../guards/admin.guard'
import { AuthGuard } from '../guards/auth.guard'

export const Auth = (role?: Role) =>
	applyDecorators(
		role === Role.ADMIN
			? UseGuards(AuthGuard, OnlyAdminGuard)
			: UseGuards(AuthGuard)
	)
