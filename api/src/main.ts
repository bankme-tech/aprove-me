import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.setGlobalPrefix('/api');
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('frontendURL'),
    methods: 'GET, PUT, PATCH, POST, DELETE',
    credentials: true,
  });
  const port = configService.get('port');
  await app.listen(port, '0.0.0.0');
}
bootstrap();
