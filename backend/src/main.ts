import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter your Bearer token',
      },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  };
  app.enableCors(corsOptions);

  await app.listen(3000);
}

bootstrap();
