import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { CreateToken } from './toke';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../repositories/users/user.service';
import { AuthController } from './auth.controller';
import { TokenInterceptor } from './tokenInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    CreateToken,
    PrismaService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: TokenInterceptor,
    },
  ],
  exports: [
    AuthService,
    UserService,
    LocalStrategy,
    CreateToken,
    JwtModule,
    PrismaService,
  ],
})
export class AuthModule {}
