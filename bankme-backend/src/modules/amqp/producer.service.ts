import { Injectable, Logger } from '@nestjs/common';

// SERVICES
import { AmqpService } from './amqp.service';

// INTERFACES
import { IProducerService } from './interfaces/producer-service.interface';

// DTOS
import { CreatePayableDTO } from '../payable/dtos/create-payable.dto';

@Injectable()
export class ProducerService implements IProducerService {
	private readonly logger: Logger = new Logger(ProducerService.name);

	constructor(private readonly amqpService: AmqpService) {}

	public async addPayableToQueue(payable: CreatePayableDTO[]) {
		this.logger.log('Sending To payable_queue');

		const data = JSON.stringify({
			pattern: 'payable_queue',
			payable,
		});
		await this.amqpService.producerQueue.sendToQueue(
			'payable_queue',
			Buffer.from(data),
		);
	}

	public async addPayableToDeadQueue(payable: CreatePayableDTO[]) {
		this.logger.log('Sending To dead_queue');

		const data = JSON.stringify({
			pattern: 'dead_queue',
			payable,
		});
		await this.amqpService.producerQueue.sendToQueue(
			'dead_queue',
			Buffer.from(data),
		);
	}
}
