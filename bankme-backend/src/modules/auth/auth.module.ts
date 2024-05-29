import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

// CONTROLLERS
import { AuthController } from './auth.controller';

// SERVICES
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: `jwt` }),
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: {
				expiresIn: '12h',
			},
		}),
	],
	providers: [JwtStrategy, AuthService, JwtService],
	controllers: [AuthController],
})
export class AuthModule {}
