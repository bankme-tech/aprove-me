import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { HealthController } from './app.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}
