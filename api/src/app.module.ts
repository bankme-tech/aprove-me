import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { ReceivableService } from './services/receivable.service';
import { AssignorService } from './services/assignor.service';
import { ReceivableController } from './controllers/receivable.controller';
import { AssignorController } from './controllers/assignor.controller';

@Module({
  imports: [],
  controllers: [AppController, ReceivableController, AssignorController],
  providers: [AppService, PrismaService, ReceivableService, AssignorService],
})
export class AppModule {}
