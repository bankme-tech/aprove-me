import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './exception-filters/prisma-exception.filter';
import { PersistenceExceptionFilter } from './exception-filters/persistence-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
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
