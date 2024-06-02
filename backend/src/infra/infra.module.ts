import { Module } from '@nestjs/common';
import { AuthModule } from './auth/';
import { HttpModule } from './http/';
import { QueueModule } from './queue';
import { DatabaseModule } from './database';

@Module({
  imports: [DatabaseModule, AuthModule, HttpModule, QueueModule],
  providers: [],
})
export class InfraModule {}
