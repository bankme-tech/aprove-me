import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { constants } from '@configs/constants';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [constants.RmqUrl],
      queue: 'payable-queue',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());

  await app.startAllMicroservices();
  await app.listen(3333);
}
bootstrap();
