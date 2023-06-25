import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';

import { PayableRepository } from '../../data/repositories/payable-repository/payable-repository';
import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { PayableConsumer } from './payable.consumer';
import { MailerService } from 'infra/mailer/mailer';
import { AssignorModule } from 'modules/assignor/assignor.module';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue(
      { name: 'payable' },
      { name: 'dead-payable' }
    ),
    AssignorModule
  ],
  controllers: [PayableController],
  providers: [
    PayableService, 
    PayableRepository, 
    AssignorRepository,
    PayableConsumer,
    MailerService
  ]
})
export class PayableModule {}
