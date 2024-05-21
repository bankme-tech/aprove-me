import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService, PrismaService],
})
export class IntegrationsModule {}
