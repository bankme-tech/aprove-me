import { Module } from '@nestjs/common';
import { RabbitMQProducer } from './rabbitmq.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: process.env.RABBITMQ_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  providers: [RabbitMQProducer],
  controllers: [],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
