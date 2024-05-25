import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './exception-filters/prisma-exception.filter';
import { PersistenceExceptionFilter } from './exception-filters/persistence-exception.filter';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('json', { limit: '50mb' });
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
  await app.listen(process.env.PORT);
}
bootstrap();
