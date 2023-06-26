import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AssignorModule } from '../assignor/assignor.module';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';
import { JwtModule } from '@nestjs/jwt';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { PrismaModule } from '../../infra/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AssignorModule, 
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, BcryptAdapter, AssignorRepository]
})
export class AuthModule {}
