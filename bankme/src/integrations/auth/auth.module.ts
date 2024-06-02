import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AssignorService } from '../assignor/assignor.service';
import { AssignorModule } from '../assignor/assignor.module';
import AssignorRepository from '../assignor/assignor.repository';

@Module({
  imports: [AssignorModule],
  providers: [AuthService, AssignorService, AssignorRepository],
  controllers: [AuthController],
})
export class AuthModule {}
