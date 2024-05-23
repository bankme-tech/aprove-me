import { Module } from '@nestjs/common';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { RabbitMQModule } from 'src/microservices/rmq/rabbitmq.module';
import { EmailModule } from 'src/services/email/email.module';

@Module({
  imports: [
    RabbitMQModule,
    InfrastructureModule,
    EmailModule,
  ],
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule { }
