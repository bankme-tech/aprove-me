import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  private readonly client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@rabbitmq:5672'],
        queue: 'payables_queue', 
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async sendToQueue(): Promise<void> {
    this.logger.debug('Trying send to queue');
    this.client.emit<JSON>('processBatch', {
      value: 50,
      emissionDate: '2023-11-17T10:30:00.000Z',
      assignorId: '6ea9949b-9cd5-4630-9b76-5d922cf59fdc',
    });
  }
}
