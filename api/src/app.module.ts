import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './db/prisma.module';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [PayableModule, PrismaModule, AssignorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
