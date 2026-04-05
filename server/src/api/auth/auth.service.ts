import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Response } from 'express'
import { IS_PRODUCTION } from 'src/constants/global/global.constants'
import { ROUTE } from 'src/constants/route/route.constants'
import { AUTH_ERROR } from 'src/errors/auth/auth.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { Cookie } from 'src/shared/enums/cookie/cookie.enum'
import type { IRequest } from 'src/shared/interfaces/context/context.interface'
import { CURRENT_USER_SELECT } from '../user/selects/current-user/current-user.select'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	async logout(response: Response) {
		await this.removeToken(response, Cookie.ACCESS_TOKEN)
		await this.removeToken(response, Cookie.REFRESH_TOKEN)
	}

	async sendVerification(key: string, phone: string) {
		const isUserExist = await this.prisma.user.count({
			where: {
				phone,
			},
		})

		// if (isUserExist) return AUTH_ERROR.USER_EXIST_PHONE()

		try {
			await fetch(ROUTE.VERIFICATION.SEND_CODE, {
				method: 'POST',
				headers: {
					Authorization: `Basic ${process.env.WIDGET_TOKEN}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					key,
				}),
			})

			return true
		} catch (error) {
			return false
		}
	}

	async checkAccessToken(
		accessToken: string,
		refreshToken: string,
		request: IRequest,
		response: Response
	) {
		let id: number | null = null

		try {
			const accessResult = await this.jwtService.verifyAsync(accessToken, {
				secret: process.env.ACCESS_TOKEN_JWT_SECRET,
			})

			id = accessResult.id
		} catch {
			return this.generateAccessToken(refreshToken, request, response)
		}

		const user = await this.userService.byId(id, CURRENT_USER_SELECT)

		if (!user) {
			await this.logout(response)

			return AUTH_ERROR.UNAUTHORIZED()
		}

		request.user = user
	}

	async issueTokens(id: number, response: Response, isRemember: boolean) {
		const jwtData = { id }

		const accessToken = await this.jwtService.signAsync(jwtData, {
			expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES}m`,
			secret: process.env.ACCESS_TOKEN_JWT_SECRET,
		})

		const refreshToken = await this.jwtService.signAsync(jwtData, {
			expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE_DAYS}d`,
			secret: process.env.REFRESH_TOKEN_JWT_SECRET,
		})

		await this.setToken(response, accessToken, Cookie.ACCESS_TOKEN, isRemember)
		await this.setToken(
			response,
			refreshToken,
			Cookie.REFRESH_TOKEN,
			isRemember
		)
	}

	async generateAccessToken(
		refreshToken: string,
		request: IRequest,
		response: Response
	) {
		try {
			const refreshResult = await this.jwtService.verifyAsync(refreshToken, {
				secret: process.env.REFRESH_TOKEN_JWT_SECRET,
			})

			const user = await this.userService.byId(
				refreshResult.id,
				CURRENT_USER_SELECT
			)

			request.user = user

			await this.issueTokens(user.id, response, user.isRemember)
		} catch {
			await this.logout(response)

			return AUTH_ERROR.UNAUTHORIZED()
		}
	}

	async removeToken(response: Response, type: Cookie) {
		response.clearCookie(type, {
			httpOnly: true,
			domain: process.env.DOMAIN,
			secure: IS_PRODUCTION,
			path: '/',
			sameSite: 'lax',
		})
	}

	async setToken(
		response: Response,
		token: string,
		type: Cookie,
		isRemember: boolean
	) {
		const options: any = {
			httpOnly: true,
			domain: process.env.DOMAIN,
			secure: IS_PRODUCTION,
			path: '/',
			sameSite: 'lax',
		}

		if (type === Cookie.ACCESS_TOKEN) {
			const expires = new Date()
			expires.setTime(
				expires.getTime() +
					Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) * 60 * 1000
			)
			options.expires = expires
		} else if (type === Cookie.REFRESH_TOKEN) {
			if (isRemember) {
				const expires = new Date()
				expires.setDate(
					expires.getDate() + Number(process.env.REFRESH_TOKEN_EXPIRE_DAYS)
				)
				options.expires = expires
			}
		}

		response.cookie(type, token, options)
	}
}
