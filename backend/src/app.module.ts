import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PayablesModule } from './integrations/payables/payables.module';
import { AssignorsModule } from './integrations/assignors/assignors.module';

@Module({
  imports: [PayablesModule, AssignorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
