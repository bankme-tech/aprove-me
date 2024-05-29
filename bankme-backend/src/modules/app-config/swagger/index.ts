import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const configureAndBuildSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('BankMe - Backend')
		.setDescription('Documentation')
		.setVersion(process.env.version || '0.0.1')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api/docs', app, document);
	Logger.log(`Swagger configured`, `SWAGGER`);
};
