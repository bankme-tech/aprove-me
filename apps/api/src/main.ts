import { NestFactory } from '@nestjs/core';

import { EnvService } from '@bankme/nestjs-env';

import { AppModule } from 'src/app.module';
import { setupApp } from 'src/setup-app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  setupApp(app);
  const envService = app.get(EnvService);
  await app.listen(envService.get('PORT') || 3000);
}
bootstrap();
