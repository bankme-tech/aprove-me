import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocument, customOptions } from '@config/docs/swagger';

export const setupDocs = (app: INestApplication): void => {
  SwaggerModule.setup('api/docs/v1', app, createDocument(app), customOptions);
};
