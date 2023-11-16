import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [PrismaModule, PayableModule, AssignorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
