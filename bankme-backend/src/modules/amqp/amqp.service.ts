import { Injectable } from '@nestjs/common';
import { Channel } from 'amqplib';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { IAmqpConnectionManager } from 'amqp-connection-manager/dist/types/AmqpConnectionManager';

// INTERFACES
import { IAmqpService } from './interfaces/amqp-service.interface';

@Injectable()
export class AmqpService implements IAmqpService {
	private publishProducerChannel: ChannelWrapper;
	private publishDeadChannel: ChannelWrapper;

	public get producerQueue(): ChannelWrapper {
		if (!this.publishProducerChannel) {
			const conn = this.channelConnection();
			this.publishProducerChannel = conn.createChannel({
				setup: (chn: Channel) => chn.assertQueue(`payable_queue`),
			});
		}

		return this.publishProducerChannel;
	}

	public get deadQueue(): ChannelWrapper {
		if (!this.publishDeadChannel) {
			const conn = this.channelConnection();
			this.publishDeadChannel = conn.createChannel({
				setup: (chn: Channel) =>
					chn.assertQueue(`dead_queue`, { durable: true }),
			});
		}

		return this.publishDeadChannel;
	}

	private channelConnection(): IAmqpConnectionManager {
		return amqp.connect(
			`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_DEFAULT_HOST}:5672`,
		);
	}
}
