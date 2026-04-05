import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './errors/errors.filter'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.enableCors({
		origin: [process.env.NEXT_APP_URL, process.env.EXTENSION_URL],
		credentials: true,
		allowedHeaders: [
			'Accept',
			'Content-Type',
			'X-Requested-With',
			'Apollo-Require-Preflight',
		],
		methods: ['GET', 'POST', 'OPTIONS'],
	})
	app.use(cookieParser())
	app.useGlobalFilters(new AllExceptionsFilter())
	app.disable('x-powered-by')
	app.setGlobalPrefix('api')

	await app.listen(process.env.PORT)
}
bootstrap()
