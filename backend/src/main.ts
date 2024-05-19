import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { BASE_PATH } from './common/constants/paths';
import { GeneralErrorFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Main');

  app.useGlobalFilters(new GeneralErrorFilter(logger));

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix(BASE_PATH);

  await app.listen(3000);
}
bootstrap();
