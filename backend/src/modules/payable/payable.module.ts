import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorModule } from '../assignor/assignor/assignor.module';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  imports: [AssignorModule],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
