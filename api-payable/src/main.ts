import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { connectQueues } from './microservices/rmq/connect-queues';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get<ConfigService>(ConfigService);
  connectQueues(app, {
    host: configService.getOrThrow('RABBITMQ_HOST'),
    password: configService.getOrThrow('RABBITMQ_PASSWORD'),
    port: configService.getOrThrow('RABBITMQ_PORT'),
    username: configService.getOrThrow('RABBITMQ_USER'),
    // vhost: configService.getOrThrow('RABBITMQ_HOST'),
  });
  app.startAllMicroservices();

  // const port = configService.getOrThrow('API_PORT');
  // await app.listen(Number(port));
  await app.listen(3000);
}
bootstrap();
