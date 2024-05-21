import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './config/prisma.service';
import { AssignorModule } from './modules/assignor/assignor/assignor.module';
import { PayableModule } from './modules/payable/payable.module';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
