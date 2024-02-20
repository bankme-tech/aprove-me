import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    BullModule.forRoot({
      redis: {
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
    HttpModule,
  ],
})
export class AppModule {}
