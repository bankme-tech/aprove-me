import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from 'src/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'redis',
        port: 6379,
      },
    },
  );
  await app.listen();
}
bootstrap();
