import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PrismaModule } from '../../infra/database/prisma/prisma.module';
import { PayableService } from './payable.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [PrismaModule, BullModule.registerQueue({ name: 'create_payable' })],
  providers: [PayableService],
  controllers: [PayableController],
  exports: [PayableService],
})
export class PayableModule {}
