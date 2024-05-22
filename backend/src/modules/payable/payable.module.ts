import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorModule } from '../assignor/assignor.module';
import { UserPayableModule } from '../user-payable/user-payable.module';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';

@Module({
  imports: [AssignorModule, UserPayableModule],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
