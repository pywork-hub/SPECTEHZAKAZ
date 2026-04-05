import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import type { CurrentUser } from 'src/api/user/entities/current-user/current-user.entity'
import { AUTH_ERROR } from 'src/errors/auth/auth.error'
import { Role } from 'src/shared/enums/role/role.enum'

export class OnlyAdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const request = ctx.getContext().req

		const user: CurrentUser = request.user

		if (user.role !== Role.ADMIN) {
			return AUTH_ERROR.NOT_ENOUGH_RIGHTS()
		}

		return true
	}
}
