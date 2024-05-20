import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './prisma/prisma.service';
import { AssignorModule } from './assignor/assignor.module';

@Module({
  imports: [PayableModule, AssignorModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
