import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IProducer } from './interfaces/producer.interface';

@Injectable()
export class RabbitMQProducer<T> implements IProducer<T> {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async publishMessage(message: T): Promise<void> {
    lastValueFrom(this.client.emit(process.env.RABBITMQ_QUEUE, message)).then(
      () => {
        Logger.log('Message published', RabbitMQProducer.name);
      },
    );
  }
}
