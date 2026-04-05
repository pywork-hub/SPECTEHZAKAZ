import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CurrentUser as Me } from '../entities/current-user/current-user.entity'

export const CurrentUser = createParamDecorator(
	(key: keyof Me, ctx: ExecutionContext) => {
		let user: Me

		if (ctx.getType() === 'http') {
			user = ctx.switchToHttp().getRequest().user
		} else {
			const context = GqlExecutionContext.create(ctx)
			user = context.getContext().req.user
		}

		return user ? (key ? user[key] : user) : null
	}
)
