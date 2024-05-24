import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useSwagger } from '@infra/http/swagger/useSwagger';
import * as passport from 'passport';
import { useCors } from '@infra/http/cors/useCors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  useCors(app);
  useSwagger(app);
  await app.listen(3000);
}
bootstrap();
