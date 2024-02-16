import { Module } from '@nestjs/common';
import { PayableConsumerController } from './payable-consumer.controller';
import { PayableConsumerService } from './payable-consumer.service';

@Module({
  imports: [],
  controllers: [PayableConsumerController],
  providers: [PayableConsumerService],
})
export class PayableConsumerModule {}
