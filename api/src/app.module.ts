import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './payable/payable.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PayableModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
