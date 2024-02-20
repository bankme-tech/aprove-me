import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot(),
    DatabaseModule,
    HttpModule,
  ],
})
export class AppModule {}
