import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayableModule } from './batch/payable/payable.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [PayableModule, PrismaModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
