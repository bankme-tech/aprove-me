import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [IntegrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
