import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { ReceivableModule } from './modules/receivable/receivable.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from './modules/env/env.module';
import { EnvService } from './modules/env/env.service';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './modules/env/env';

@Module({
  imports: [
    DatabaseModule,
    ReceivableModule,
    AssignorModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => {
        return {
          global: true,
          secret: envService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: envService.get('JWT_EXPIRATION_TIME'),
          },
        };
      },
      inject: [EnvService],
    }),
    ConfigModule.forRoot({
      validate: (env) => validateEnv(env),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
