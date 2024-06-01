import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { AssignorModule } from '../assignor/assignor.module';
import { PayableController } from './payable.controller';
import { PayableProcessor } from './payable.processor';
import { PayableService } from './payable.service';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payable',
    }),
    AssignorModule,
  ],
  controllers: [PayableController],
  providers: [PayableService, PrismaService, PayableProcessor],
})
export class PayableModule {}
