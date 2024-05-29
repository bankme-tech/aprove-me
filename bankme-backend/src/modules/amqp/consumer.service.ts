import { BadRequestException, Injectable, Logger } from '@nestjs/common';

// SERVICES
import { AmqpService } from './amqp.service';
import { MailService } from '../mail/mail.service';
import { PayableService } from '../payable/payable.service';
import { AssignorService } from '../assignor/assignor.service';

// INTERFACES
import { IConsumerService } from './interfaces/consumer-service.interface';

// DTOS
import { CreatePayableDTO } from '../payable/dtos/create-payable.dto';

@Injectable()
export class ConsumerService implements IConsumerService {
	private readonly logger: Logger = new Logger(ConsumerService.name);
	private readonly maxRetries = 4;

	constructor(
		private readonly amqpService: AmqpService,
		private readonly payableService: PayableService,
		private readonly assignorService: AssignorService,
		private readonly mailService: MailService,
	) {}

	public async consumePayableQueue(payable: CreatePayableDTO[]) {
		this.logger.log('ConsumePayableQueue');

		let successCount = 0;
		let failureCount = 0;
		for (const item of payable) {
			let retries = 0;
			let success = false;

			while (!success && retries <= this.maxRetries) {
				try {
					const assignor = await this.assignorService.getAssignor(
						item.assignorId,
					);
					if (!assignor)
						throw new BadRequestException(`Assignor not found`);

					await this.payableService.createPayable(item);
					success = true;
				} catch (error) {
					this.logger.error(error);
					this.logger.error(
						`Something went wrong - payable: ${JSON.stringify(item)}`,
					);
					retries++;
				}
			}

			if (!success) {
				this.logger.error(`Error while creating payable`);
				failureCount++;
				const data = JSON.stringify({
					pattern: 'dead_queue',
					payable: item,
				});
				await this.amqpService.deadQueue.sendToQueue(
					'dead_queue',
					Buffer.from(data),
				);
				this.mailService.sendEmail({
					from: process.env.SMTP_USER as string,
					to: process.env.OPERATION_TEAM_EMAIL as string,
					subject: `Processed Batch`,
					content: this.generateDeadQueueEmailContent(item),
				});
			} else {
				successCount++;
			}
		}

		await this.mailService.sendEmail({
			from: process.env.SMTP_USER as string,
			to: process.env.OPERATION_TEAM_EMAIL as string,
			subject: `Processed Batch`,
			content: this.generatePayableQueueEmailContent(
				successCount,
				failureCount,
			),
		});
	}

	private generatePayableQueueEmailContent(
		successCount: number,
		failureCount: number,
	) {
		return `
Items processed: ${successCount + failureCount}
Success ${successCount} - Fail ${failureCount}
`;
	}

	private generateDeadQueueEmailContent(payable: CreatePayableDTO) {
		return `
Failed to create payable: ${JSON.stringify(payable)}
`;
	}
}
