import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const corsOptions: CorsOptions = {
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Accept',
  //   credentials: true,
  // };

  // app.enableCors(corsOptions);
  // TODO: Create config for Cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
