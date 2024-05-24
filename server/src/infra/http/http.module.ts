import { Module } from '@nestjs/common';
import { HttpAssignorModule } from './assignor/http-assignor.module';
import { HttpPayableModule } from './payable/http-payable.module';
import { HttpUserModule } from './user/http-user.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    HttpAssignorModule,
    HttpPayableModule,
    HttpUserModule,
    RabbitMQModule,
  ],
})
export class HttpModule {}
