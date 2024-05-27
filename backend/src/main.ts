import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './exception-filters/prisma-exception.filter';
import { PersistenceExceptionFilter } from './exception-filters/persistence-exception.filter';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as amqp from 'amqplib';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '50mb' });
  app.enableCors();
  app.setGlobalPrefix('integrations');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(
    new PersistenceExceptionFilter(),
    new PrismaExceptionFilter(),
  );

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_QUEUE,
        queueOptions: {
          durable: true,
          deadLetterExchange: process.env.RABBITMQ_DEAD_LETTER_EXCHANGE,
          deadLetterRoutingKey: process.env.RABBITMQ_DEAD_LETTER_ROUTING_KEY,
        },
        noAck: false,
      },
    },
    { inheritAppConfig: true },
  );

  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(
    process.env.RABBITMQ_DEAD_LETTER_EXCHANGE,
    'direct',
    { durable: true },
  );
  await channel.assertQueue(process.env.RABBITMQ_DEAD_LETTER_QUEUE, {
    durable: true,
  });
  await channel.bindQueue(
    process.env.RABBITMQ_DEAD_LETTER_QUEUE,
    process.env.RABBITMQ_DEAD_LETTER_EXCHANGE,
    process.env.RABBITMQ_DEAD_LETTER_ROUTING_KEY,
  );

  await app.startAllMicroservices();

  await app.listen(process.env.PORT);
}
bootstrap();
