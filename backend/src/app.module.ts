import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
import { InfraModule } from '@infra/infra.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    InfraModule,
  ],
  providers: [AppConfig],
})
export class AppModule {}
