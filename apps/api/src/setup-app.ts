import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import '@domain/shared/id';
import '@domain/shared/wrapper';

export function setupApp(app: INestApplication): void {
  _setupSwagger(app);
  app.enableCors();
}

function _setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('BankMe')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`swagger`, app, document, {
    swaggerOptions: { docExpansion: 'none' },
  });
}
