import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '@/infra/env/env';
import { EnvService } from '@/infra/env/env.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validate: (env) => validateEnv(env),
      isGlobal: true,
    }),
    EnvService,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
