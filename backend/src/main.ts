import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/integrations');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
