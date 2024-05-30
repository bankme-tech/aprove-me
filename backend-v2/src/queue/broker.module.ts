import { Module } from '@nestjs/common';
import { RabbitMqFactoryService } from './rabbit-mq.service';

@Module({
    providers: [RabbitMqFactoryService],
    exports: [RabbitMqFactoryService],
})
export class BrokerModule {}
