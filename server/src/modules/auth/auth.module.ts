import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AssignorModule } from '../assignor/assignor.module';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { BcryptAdapter } from '../../infra/bcrypt/bcrypt-adapter';

@Module({
  imports: [AssignorModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, BcryptAdapter]
})
export class AuthModule {}
