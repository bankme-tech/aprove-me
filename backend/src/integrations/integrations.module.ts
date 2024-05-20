import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';

@Module({
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
})
export class IntegrationsModule {}
