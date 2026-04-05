import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/api/user/entities/current-user/current-user.entity'
import type { IContext } from 'src/shared/interfaces/context/context.interface'
import { LoginInput } from './inputs/login/login.input'
import { RegisterInput } from './inputs/register/register.input'
import { JwtAuthService } from './jwt-auth.service'

@Resolver()
export class JwtAuthResolver {
	constructor(private readonly authService: JwtAuthService) {}

	@Mutation(() => CurrentUser, { name: 'register' })
	async register(
		@Context() { res }: IContext,
		@Args('data') input: RegisterInput
	) {
		return this.authService.register(input, res)
	}

	@Mutation(() => CurrentUser, { name: 'login' })
	async login(@Context() { res }: IContext, @Args('data') input: LoginInput) {
		return this.authService.login(input, res)
	}
}
