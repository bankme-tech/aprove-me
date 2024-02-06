import { Module } from '@nestjs/common';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PayableModule, AssignorModule],
  providers: [PrismaService]
})
export class AppModule {}
