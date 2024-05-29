import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import amqp, { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { CreatePayableDto } from 'src/integration/payable/dto/create-payable.dto';
import { Payable } from '@prisma/client';

type ConsumerOptions = {
    retries: number;
    interval: number;
    queueName: string;
    consumerTag: string;
    noAck: boolean;
    prefetchCount: number;
    noLocal: boolean;
    exclusive: boolean;
    args: any;
    onMessage?: (msg: any) => void;
    onConsumeError?: (msg: any) => void;
    onConsumeOk?: (msg: any) => void;
    onCancel?: (msg: any) => void;
    onCancelOk?: (msg: any) => void;
    onShutdown?: (msg: any) => void;
    onReturn?: (msg: any) => void;
    onConfirm?: (msg: any) => void;
    onBlocked?: (msg: any) => void;
    onUnblocked?: (msg: any) => void;
    onFailure?: (msg: any) => void;
}

@Injectable()
export class RabbitMqFactoryService implements OnModuleDestroy {
    private readonly logger = new Logger(RabbitMqFactoryService.name);
    private readonly connection: AmqpConnectionManager;

    constructor() {
        this.connection = amqp.connect([process.env.RABBITMQ_URI || 'amqp://localhost:5672']);
    }

    createProducer(queueName: string): RabbitMqProducer {
        const channel = this.connection.createChannel({
            json: true,
            setup: (channel) => channel.assertQueue(queueName, { durable: true }),
        });
        return new RabbitMqProducer(channel, this.logger, queueName);
    }

    createConsumer(consumerOptions: ConsumerOptions): RabbitMqConsumer {
        const channel = this.connection.createChannel({
            json: true,
            setup: (channel) => channel.assertQueue(consumerOptions.queueName, { durable: true }),
        });
        return new RabbitMqConsumer(channel, this.logger, consumerOptions);
    }

    async onModuleDestroy() {
        await this.connection.close();
    }
}

class RabbitMqProducer {
    constructor(
        private channel: ChannelWrapper,
        private logger: Logger,
        private queueName: string
    ) {}

    async addPayables(payables: CreatePayableDto[]) {
        this.logger.log(`Adding payables to queue ${this.queueName}`);
        for (const payable of payables) {
            this.logger.log('Adding payable to queue');
            await this.channel.sendToQueue(this.queueName, payable);
        }
    }
}

class RabbitMqConsumer {
    constructor(
        private channel: ChannelWrapper,
        private logger: Logger,
        private options: ConsumerOptions
    ) {}

    async addPayableListener() {
        try {
            this.channel.consume(
                this.options.queueName,
                async (message) => {
                    this.logger.log('Receiving message from RabbitMQ');
                    const msg = JSON.parse(message.content.toString());

                    let retries = 0;
                    const processMessage = async () => {
                        try {
                            if (this.options.onMessage) {
                                await this.options.onMessage(msg);
                            }
                            this.channel.ack(message);
                            if (this.options.onConsumeOk) {
                                this.options.onConsumeOk(msg);
                            }
                        } catch (error) {
                            if (this.options.onConsumeError) {
                                this.options.onConsumeError(error);
                            }

                            if (retries < this.options.retries) {
                                retries++;
                                setTimeout(processMessage, this.options.interval);
                            } else {
                                if (this.options.onFailure) {
                                    this.options.onFailure(error);
                                }
                                if (!this.options.noAck) {
                                    this.channel.nack(message, false, false);
                                }
                            }
                        }
                    };

                    processMessage();
                }
            );
        } catch (error) {
            this.logger.error(`Error adding listener to queue ${this.options.queueName}:`, error);
        }
    }
}
