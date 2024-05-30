import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import amqp, { AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { CreatePayableDto } from 'src/integration/payable/dto/create-payable.dto';
import { Payable } from '@prisma/client';

type ConsumerOptions<T> = {
    retries: number;
    interval: number;
    queueName: string;
    consumerTag: string;
    noAck: boolean;
    prefetchCount: number;
    noLocal: boolean;
    exclusive: boolean;
    args: any;
    onMessage?: (msg: T) => void;
    onConsumeError?: (msg: T) => void;
    onConsumeOk?: (msg: T) => void;
    onCancel?: (msg: T) => void;
    onCancelOk?: (msg: T) => void;
    onShutdown?: (msg: T) => void;
    onReturn?: (msg: T) => void;
    onConfirm?: (msg: T) => void;
    onBlocked?: (msg: T) => void;
    onUnblocked?: (msg: T) => void;
    onFailure?: (msg: T) => void;
}

@Injectable()
export class RabbitMqFactoryService implements OnModuleDestroy, OnModuleInit {
    private readonly logger = new Logger(RabbitMqFactoryService.name);
    private connection: AmqpConnectionManager;

    async onModuleInit() {
        this.connection = await amqp.connect([process.env.RABBITMQ_URI || 'amqp://localhost:5672']);
    }

    createProducer<T>(queueName: string): RabbitMqProducer<T> {
        const channel = this.connection.createChannel({
            json: true,
            setup: (channel) => channel.assertQueue(queueName, { durable: true }),
        });
        return new RabbitMqProducer<T>(channel, this.logger, queueName);
    }

    createConsumer<T>(consumerOptions: ConsumerOptions<T>): RabbitMqConsumer<T> {
        const channel = this.connection.createChannel({
            json: true,
            setup: (channel) => channel.assertQueue(consumerOptions.queueName, { durable: true }),
        });
        return new RabbitMqConsumer<T>(channel, this.logger, consumerOptions);
    }

    async onModuleDestroy() {
        await this.connection.close();
    }
}

export class RabbitMqProducer<T> {
    constructor(
        private channel: ChannelWrapper,
        private logger: Logger,
        private queueName: string
    ) {}

    async addToQueue(data: T[]) {
        this.logger.log(`Adding items to queue ${this.queueName}`);
        for (const item of data) {
            this.logger.log('Adding item to queue');
            await this.channel.sendToQueue(this.queueName, item);
        }
    }
}

export class RabbitMqConsumer<T> {
    private listeners: Array<(msg: T) => void> = [];

    constructor(
        private channel: ChannelWrapper,
        private logger: Logger,
        private options: ConsumerOptions<T>
    ) {
        this.initializeConsumer();
    }

    private initializeConsumer() {
        try {
            this.channel.consume(
                this.options.queueName,
                async (message) => {
                    this.logger.log('Receiving message from RabbitMQ');
                    const msg: T = JSON.parse(message.content.toString());

                    let retries = 0;
                    const processMessage = async () => {
                        try {
                            for (const listener of this.listeners) {
                                await listener(msg);
                            }

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

    async addPayableListener(callback: (payable: T) => void) {
        this.listeners.push(callback);
    }
}
