import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PayableConsumerService } from './payable-consumer/payable-consumer.service';
import { BrokerModule } from 'src/queue/broker.module';

@Module({
  imports: [DatabaseModule, BrokerModule],
  controllers: [PayableController],
  providers: [PayableService, PayableConsumerService],
})
export class PayableModule {}
