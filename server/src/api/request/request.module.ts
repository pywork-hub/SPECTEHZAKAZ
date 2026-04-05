import { Module } from '@nestjs/common'
import { TelegramService } from '../telegram/telegram.service'
import { RequestResolver } from './request.resolver'
import { RequestService } from './request.service'

@Module({
	providers: [RequestResolver, RequestService, TelegramService],
})
export class RequestModule {}
