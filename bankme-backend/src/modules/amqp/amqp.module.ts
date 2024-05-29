import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AmqpController } from './amqp.controller';

import { PayableModule } from '../payable/payable.module';
import { AssignorModule } from '../assignor/assignor.module';

// SERVICES
import { AmqpService } from './amqp.service';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Global()
@Module({
	imports: [
		PayableModule,
		AssignorModule,
		ClientsModule.register([
			{
				name: 'RABBITMQ_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [
						`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:5672`,
					],
					queue: 'payable_queue',
					queueOptions: {
						durable: true,
					},
					noAck: false,
				},
			},
		]),
	],
	providers: [AmqpService, ProducerService, ConsumerService],
	exports: [AmqpService, ProducerService, ConsumerService],
	controllers: [AmqpController],
})
export class AmqpModule {}
