import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntegrationsModule } from './integrations/integrations.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [IntegrationsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
