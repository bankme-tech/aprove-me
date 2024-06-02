import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SWAGGER_CONFIG } from './config';

export function createDocument(app: INestApplication): OpenAPIObject {
  const formattedDescription = SWAGGER_CONFIG.description
    .split('\n')
    .map((paragraph) => `<span style="color: black;">${paragraph}</span>`)
    .join('<br>');

  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(`<div style="width: 100%;">${formattedDescription}</div>`)
    .setVersion(SWAGGER_CONFIG.version)
    .addBearerAuth({
      description: 'Enter your bearer token here',
      type: 'http',
      bearerFormat: 'token',
    });

  const options = builder.build();
  return SwaggerModule.createDocument(app, options);
}
