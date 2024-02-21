import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { HealthController } from './app.controller';
import { PayableModule } from './payable/payable.module';

@Module({
  imports: [PayableModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
