import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import type {
	InlineKeyboardButton
} from 'telegraf/typings/core/types/typegram'

@Injectable()
export class TelegramService {
	async sendMessage(
		message: string,
		keyboards: InlineKeyboardButton[],
		imagePaths?: string[]
	) {
		const bot = new Telegraf('7885868093:AAG3Vlt2-6q-9nKAFaObtyRBpMcSEtYpBu0')

		if (imagePaths?.length > 0) {
			const media = imagePaths.map((path) => ({
				type: 'photo',
				media: `${process.env.CLOUD_URL}${path}`,
				parse_mode: 'HTML',
			}))

			await bot.telegram.sendMediaGroup('1330440125', media as any)
		}

		await bot.telegram.sendMessage('1330440125', message, {
			reply_markup: {
				inline_keyboard: [keyboards],
			},
			parse_mode: 'HTML',
		})
	}
}
