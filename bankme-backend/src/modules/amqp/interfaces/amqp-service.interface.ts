import { ChannelWrapper } from 'amqp-connection-manager';

export interface IAmqpService {
	producerQueue: ChannelWrapper;
	deadQueue: ChannelWrapper;
}
