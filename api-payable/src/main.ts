import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { connectQueues } from './microservices/rmq/connect-queues';
import { ConfigService } from '@nestjs/config';
import { getRabbitMQConn } from './microservices/rmq/rabbitmq.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);
  const rabbitMQConn = getRabbitMQConn(configService);
  connectQueues(app, rabbitMQConn);
  app.startAllMicroservices();

  const port = Number(configService.getOrThrow('API_PORT'));
  await app.listen(port);
}
bootstrap();
