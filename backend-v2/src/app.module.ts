import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [IntegrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}