import { Module } from '@nestjs/common'
import { YookassaController } from './yookassa.controller'
import { YookassaService } from './yookassa.service'

@Module({
	providers: [YookassaController, YookassaService],
})
export class YookassaModule {}
