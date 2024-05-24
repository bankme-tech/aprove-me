import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const useCors = (app: INestApplication): void => {
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
};
