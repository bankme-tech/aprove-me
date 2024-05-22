import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayablesModule } from './integrations/payables/payables.module';

@Module({
  imports: [PayablesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
