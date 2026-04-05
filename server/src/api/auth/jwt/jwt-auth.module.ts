import { Module } from '@nestjs/common'
import { JwtAuthResolver } from './jwt-auth.resolver'
import { JwtAuthService } from './jwt-auth.service'

@Module({
	providers: [JwtAuthResolver, JwtAuthService],
})
export class JwtAuthModule {}
