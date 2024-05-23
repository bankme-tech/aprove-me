import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import {
  PAYABLE_BATCH_INJECT_TOKEN,
  PayableQueueProvider,
  getPayableBatchProducer,
} from "./payable-queue.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RabbitmqConnection } from "./connect-queues";
import {
  PAYABLE_DEAD_LETTER_INJECT_TOKEN,
  PayableDeadLetterQueueProvider,
  getPayableBatchDLQProducer,
} from "./payable-dead-letter-queue.service";

export function getRabbitMQConn(configService: ConfigService): RabbitmqConnection {
  return {
    host: configService.getOrThrow('RABBITMQ_HOST'),
    password: configService.getOrThrow('RABBITMQ_PASSWORD'),
    port: configService.getOrThrow('RABBITMQ_PORT'),
    username: configService.getOrThrow('RABBITMQ_USER'),
    // vhost: configService.getOrThrow('RABBITMQ_VHOST'),
  };
}

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from .env file
    ClientsModule.registerAsync([
      {
        name: PAYABLE_BATCH_INJECT_TOKEN,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const conn = getRabbitMQConn(configService);
          return getPayableBatchProducer(conn);
        },
      },
      {
        name: PAYABLE_DEAD_LETTER_INJECT_TOKEN,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          const conn = getRabbitMQConn(configService);
          return getPayableBatchDLQProducer(conn);
        },
      },
    ]),
  ],

  providers: [PayableQueueProvider, PayableDeadLetterQueueProvider],
  exports: [PayableQueueProvider, PayableDeadLetterQueueProvider],
})
export class RabbitMQModule { }
