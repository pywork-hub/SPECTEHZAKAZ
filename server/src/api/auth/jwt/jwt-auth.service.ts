import { Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'
import type { Response } from 'express'
import { CURRENT_USER_SELECT } from 'src/api/user/selects/current-user/current-user.select'
import { AUTH_ERROR } from 'src/errors/auth/auth.error'
import { USER_ERROR } from 'src/errors/user/user.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from '../auth.service'
import type { LoginInput } from './inputs/login/login.input'
import type { RegisterInput } from './inputs/register/register.input'

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly authService: AuthService
	) {}

	async register(input: RegisterInput, response: Response) {
		const isUserExist = await this.prisma.user.count({
			where: {
				email: input.email,
			},
		})

		if (isUserExist) return AUTH_ERROR.USER_EXIST_EMAIL()

		try {
			return await this.prisma.$transaction(async (prisma) => {
				const user = await prisma.user.create({
					data: {
						name: input.name,
						phone: input.phone,
						email: input.email,
						password: await hash(input.password),
						isRemember: input.isRemember,
					},
					select: CURRENT_USER_SELECT,
				})

				await this.authService.issueTokens(user.id, response, input.isRemember)

				return user
			})
		} catch {
			return AUTH_ERROR.REGISTER()
		}
	}

	async login(input: LoginInput, response: Response) {
		const user = await this.prisma.user.findFirst({
			where: {
				OR: [
					...(input.email ? [{ email: input.email }] : []),
					...(input.phone ? [{ phone: input.phone }] : []),
				],
			},
			select: { password: true, ...CURRENT_USER_SELECT },
		})

		if (!user || !(await verify(user.password, input.password))) {
			return USER_ERROR.NOT_FOUND()
		}

		try {
			await this.prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					isRemember: input.isRemember,
				},
			})

			await this.authService.issueTokens(user.id, response, input.isRemember)

			return user
		} catch {
			return AUTH_ERROR.LOGIN()
		}
	}
}
