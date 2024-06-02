import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupApp } from '@config/setup-app';
import { setupDocs } from '@config/setup-docs';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  setupApp(app);
  setupDocs(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
