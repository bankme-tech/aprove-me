import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';

@Module({
  controllers: [IntegrationsController]
})
export class IntegrationsModule {}
