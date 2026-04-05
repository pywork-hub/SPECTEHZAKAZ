import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { JwtAuthModule } from './jwt/jwt-auth.module'

@Module({
	imports: [JwtAuthModule],
	providers: [AuthResolver, AuthService],
})
export class AuthModule {}
