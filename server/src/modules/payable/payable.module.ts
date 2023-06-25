import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';

import { PayableRepository } from '../../data/repositories/payable-repository/payable-repository';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { PayableConsumer } from './payable.consumer';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'payable',
    })
  ],
  controllers: [PayableController],
  providers: [
    PayableService, 
    PayableRepository, 
    AssignorRepository,
    PayableConsumer
  ]
})
export class PayableModule {}
