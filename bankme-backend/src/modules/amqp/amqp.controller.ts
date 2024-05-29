import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

// SERVICES
import { ConsumerService } from './consumer.service';

@Controller()
export class AmqpController {
	constructor(private readonly consumerService: ConsumerService) {}

	@MessagePattern('payable_queue')
	public async consumeQueue(@Ctx() context: RmqContext) {
		const content = JSON.parse(context.getMessage().content);
		await this.consumerService.consumePayableQueue(content.payable);
		return true;
	}
}
