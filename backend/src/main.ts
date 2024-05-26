import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log("__dirname:", __dirname);

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Habilitar CORS para todos os domínios
  app.enableCors();

  // Ou, para habilitar CORS com opções específicas:
  app.enableCors({
    origin: 'http://localhost:5173', // Substitua com o(s) domínio(s) que você quer permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  // enable fot all interfaces (necessary for develoment cause I'm using WSL).
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
