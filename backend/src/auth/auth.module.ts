import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { CreateToken } from './toke';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../repositories/users/user.service';
import { AuthController } from './auth.controller';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
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
