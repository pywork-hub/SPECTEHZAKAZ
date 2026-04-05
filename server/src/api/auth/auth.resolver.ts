import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AUTH_ERROR } from 'src/errors/auth/auth.error'
import type { IContext } from 'src/shared/interfaces/context/context.interface'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Auth()
	@Mutation(() => Boolean, { name: 'logout' })
	async logout(@Context() { res }: IContext) {
		try {
			await this.authService.logout(res)

			return true
		} catch (error) {
			return AUTH_ERROR.LOGOUT()
		}
	}

	@Mutation(() => Boolean, { name: 'sendVerification' })
	async sendVerification(@Args('token') token: string, @Args('phone') phone: string) {
		return this.authService.sendVerification(token, phone)
	}
}
