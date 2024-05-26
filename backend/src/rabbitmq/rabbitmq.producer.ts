import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IProducer, Options } from './interfaces/producer.interface';

@Injectable()
export class RabbitMQProducer<T> implements IProducer<T> {
  private readonly logger = new Logger(RabbitMQProducer.name);
  private readonly queue = process.env.RABBITMQ_QUEUE;

  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async publishMessage(
    message: T,
    options: Options = { retries: 0 },
  ): Promise<void> {
    try {
      const record = new RmqRecordBuilder<T>(message)
        .setOptions({
          headers: {
            'x-retries': options.retries.toString(),
          },
        })
        .build();

      lastValueFrom(this.client.emit(this.queue, record));
      this.logger.log(`Message published to queue '${this.queue}'`);
    } catch (error) {
      this.logger.error(
        `Failed to publish message to queue '${this.queue}'`,
        error.stack,
      );
      throw error;
    }
  }
}
