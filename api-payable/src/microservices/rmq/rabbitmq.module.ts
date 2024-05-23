import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { PAYABLE_BATCH_INJECT_TOKEN, PayableQueueProvider, getPayableBatchProducer } from "./payable-queue.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from .env file
    ClientsModule.registerAsync([{
      name: PAYABLE_BATCH_INJECT_TOKEN,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return getPayableBatchProducer({
          host: configService.getOrThrow('RABBITMQ_HOST'),
          password: configService.getOrThrow('RABBITMQ_PASSWORD'),
          port: configService.getOrThrow('RABBITMQ_PORT'),
          username: configService.getOrThrow('RABBITMQ_USER'),
          // vhost: configService.getOrThrow('RABBITMQ_VHOST'),
        });
      },
    }]),
  ],
  providers: [PayableQueueProvider],
  exports: [PayableQueueProvider],
})
export class RabbitMQModule { }
