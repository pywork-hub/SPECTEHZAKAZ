import { Module } from '@nestjs/common'
import { TelegrafModule } from 'nestjs-telegraf'
import { ItemService } from '../item/item.service'
import { RequestService } from '../request/request.service'
import { ReviewService } from '../review/review.service'
import { TelegramService } from './telegram.service'
import { TelegramUpdate } from './telegram.update'

@Module({
	imports: [
		TelegrafModule.forRootAsync({
			useFactory: () => ({
				token: process.env.TELEGRAM_TOKEN,
			}),
		}),
	],
	providers: [
		TelegramService,
		TelegramUpdate,
		ReviewService,
		RequestService,
		ItemService,
	],
})
export class TelegramModule {}
