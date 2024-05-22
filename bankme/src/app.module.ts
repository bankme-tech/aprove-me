import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './integrations/payable/payable.module';
import { AssignorModule } from './integrations/assignor/assignor.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
