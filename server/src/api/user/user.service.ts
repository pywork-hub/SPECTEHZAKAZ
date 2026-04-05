import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { hash, verify } from 'argon2'
import { USER_ERROR } from 'src/errors/user/user.error'
import { PrismaService } from 'src/prisma/prisma.service'
import { formatDate } from 'src/utils/formats/format-date.util'
import type { UpdatePasswordInput } from './input/update-password/update-password.input'
import type { ProfileUpdateInput } from './input/update/profile-update.input'
import { PROFILE_EDIT_SELECT } from './selects/profile-edit/profile-edit.select'
import { PROFILE_SELECT } from './selects/profile/profile.select'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async byId(id: number, select: Prisma.UserSelect) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			select,
		})
	}

	async getProfile(id: number) {
		const profile = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: PROFILE_SELECT,
		})

		return {
			...profile,
			createdAt: formatDate(profile.createdAt, 'full'),
			itemsCount: profile._count.items,
			requestsCount: profile._count.requests,
		}
	}

	async getProfileForEdit(id: number) {
		const profile = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: PROFILE_EDIT_SELECT,
		})

		if (!profile) {
			return USER_ERROR.NOT_FOUND()
		}

		return {
			...profile,
			avatarPath: [profile.avatarPath],
		}
	}

	async updateProfile(input: ProfileUpdateInput, userId: number) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { password: true },
		})

		if (!user) {
			return USER_ERROR.NOT_FOUND()
		}

		if (input.oldPassword && input.newPassword) {
			const isMatch = await verify(user.password, input.oldPassword)

			if (!isMatch) {
				return USER_ERROR.INVALID_OLD_PASSWORD()
			}

			const newHashedPassword = await hash(input.newPassword)

			try {
				await this.prisma.user.update({
					where: { id: userId },
					data: {
						name: input.name,
						email: input.email,
						phone: input.phone,
						avatarPath: input.avatarPath[0],
						password: newHashedPassword,
					},
				})
				return true
			} catch (error) {
				console.error('UPDATE PROFILE ERROR:', error)
				return USER_ERROR.PROFILE_UPDATE()
			}
		} else {
			try {
				await this.prisma.user.update({
					where: { id: userId },
					data: {
						name: input.name,
						email: input.email,
						phone: input.phone,
						avatarPath: input.avatarPath[0],
					},
				})
				return true
			} catch (error) {
				console.error('UPDATE PROFILE ERROR:', error)
				return USER_ERROR.PROFILE_UPDATE()
			}
		}
	}

	async updatePassword(input: UpdatePasswordInput) {
		const user = await this.prisma.user.findUnique({
			where: { phone: input.phone },
		})

		if (!user) {
			return USER_ERROR.NOT_FOUND()
		}

		if (input.password !== input.confirmPassword) {
			return USER_ERROR.CONFIRM_PASSWORD()
		}

		try {
			await this.prisma.user.update({
				where: { phone: input.phone },
				data: {
					password: await hash(input.password),
				},
			})
			return true
		} catch (error) {
			console.error('RESET PASSWORD ERROR:', error)
			return USER_ERROR.PROFILE_UPDATE()
		}
	}
}
