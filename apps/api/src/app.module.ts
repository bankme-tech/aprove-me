import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PayableModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
