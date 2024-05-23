// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/user.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/user.service';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = 'zjP9hksasdj12';
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:jwtSecret,
      signOptions: { expiresIn: '60s' },
      global: true,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, JwtStrategy],
  exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
