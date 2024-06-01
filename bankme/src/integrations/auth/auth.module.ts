import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AssignorService } from '../assignor/assignor.service';

@Module({
  imports: [AssignorService],
  providers: [AuthService, AssignorService],
  controllers: [AuthController],
})
export class AuthModule {}
