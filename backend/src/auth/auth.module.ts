import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AssignorService } from '../assignor/assignor.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [AssignorService],
})
export class AuthModule {}
