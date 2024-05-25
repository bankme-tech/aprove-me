import { Global, Module } from '@nestjs/common';
import { MicroservicesService } from './microservices.service';
import { MicroservicesController } from './microservices.controller';
import { PayableService } from '../payable/payable.service';

@Global()
@Module({
  controllers: [MicroservicesController],
  providers: [MicroservicesService, PayableService],
  exports: [MicroservicesService],
})
export class MicroservicesModule {}
