import { Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthService } from './api/auth/auth.service'
import { FilterService } from './api/filter/filter.service'
import { PaginationService } from './api/pagination/pagination.service'
import { YookassaService } from './api/payment/yookassa/yookassa.service'
import { TelegramService } from './api/telegram/telegram.service'
import { UserService } from './api/user/user.service'
import { PrismaService } from './prisma/prisma.service'

@Global()
@Module({
	providers: [
		FilterService,
		PrismaService,
		PaginationService,
		JwtService,
		AuthService,
		UserService,
		YookassaService,
		TelegramService,
	],
	exports: [
		FilterService,
		PrismaService,
		PaginationService,
		JwtService,
		AuthService,
		UserService,
		YookassaService,
		TelegramService,
	],
})
export class GlobalModule {}
