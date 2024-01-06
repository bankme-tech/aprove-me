// Packages
import { Module } from '@nestjs/common';

// Current
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';

// Domains
import { PayableModule } from './payable/payable.module';

@Module({
  imports: [PayableModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
