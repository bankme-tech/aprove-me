import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { EnvService } from "./env/env.service";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });

  const envService = app.get(EnvService);
  const port = envService.get("PORT");

  await app.listen(port);
};
bootstrap();
