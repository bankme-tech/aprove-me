import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ReceivableService } from './services/receivable.service';
import { AssignorService } from './services/assignor.service';
import { ReceivableController } from './controllers/receivable.controller';
import { AssignorController } from './controllers/assignor.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ReceivableController, AssignorController],
  providers: [PrismaService, ReceivableService, AssignorService],
})
export class AppModule { }
