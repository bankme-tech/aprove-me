import { Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { PayableService } from '../payable/payable.service';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

@Injectable()
export class ConsumerService {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);
  constructor(private payableService: PayableService) {
    const connection = amqp.connect(['amqp://rabbitmq:rabbitmq@rabbitmq:5672']);
    this.channelWrapper = connection.createChannel();
  }

  async consumePayableQueue(payables: CreatePayableDto[]) {
    this.logger.log('Consuming Payable Queue');
    for (const payable of payables) {
      Logger.log(`Creating payable ${JSON.stringify(payable)}`);
      await this.payableService.create(payable);
    }
  }
}
