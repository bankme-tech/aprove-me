import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DbModule } from 'src/db/db.module';
import { AssignorModule } from 'src/app/assignor/assignor.module';
import { MailModule } from '../mail/mail.module';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PayableRepository } from './payable.repository';
import { PayableProducerController } from './queue/payable-producer.controller';
import { PayableConsumerController } from './queue/payable-consumer.controller';

@Module({
  imports: [
    DbModule,
    AssignorModule,
    ClientsModule.register([
      {
        name: 'RABBIT_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'payable_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
    MailModule,
  ],
  controllers: [PayableController, PayableProducerController, PayableConsumerController],
  providers: [PayableService, PayableRepository],
})
export class PayableModule {}
