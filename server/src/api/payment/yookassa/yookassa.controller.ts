import { Controller } from '@nestjs/common'
import { YookassaService } from './yookassa.service'

@Controller('payment/yookassa')
export class YookassaController {
	constructor(private readonly yookassaService: YookassaService) {}
}
