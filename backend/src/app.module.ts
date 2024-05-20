import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infra/database/database.module';
import { HttpModule } from '@/infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/utils/auth-guard';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
