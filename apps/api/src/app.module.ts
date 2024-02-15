import { Module } from '@nestjs/common';
import { DatabaseModule } from './app/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@/http/http.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HttpModule],
})
export class AppModule {}
