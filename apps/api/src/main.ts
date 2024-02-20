import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '15mb' }));
  app.use(urlencoded({ limit: '15mb', extended: true, parameterLimit: 10000 }));

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
