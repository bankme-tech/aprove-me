import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();
  const config = new DocumentBuilder()
    .setTitle('Aprove-me API')
    .setDescription('Uma API para aprovação no processo seletivo.')
    .setVersion('v1')
    .addTag('User', 'Endpoints relacionados a usuários')
    .addTag('Assignors', 'Endpoints relacionados aos cedentes')
    .addTag('Payables', 'Endpoints relacionados a recebíveis')
    .addTag('Auth', 'Endpoints relacionados a autenticação')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
