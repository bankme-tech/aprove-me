import { Injectable, OnModuleInit, Inject, forwardRef } from "@nestjs/common";
import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";
import { MailerService } from "src/mailer/mailer.service";
import { PayableService } from "src/payable/payable.service";
import { Logger } from '@nestjs/common';
import { Payable } from "@prisma/client";

type PayableType =  {
    "assignorId": string,
    "amount": number,
    "description": string,
    "dueDate": Date
}

@Injectable()
export class PayableProcessor implements OnModuleInit {
    private readonly maxRetries = 4;
    private connection: AmqpConnectionManager;
    private channelWrapper: ChannelWrapper;
    private readonly logger = new Logger(PayableProcessor.name);
    private tentatives: number;
    private totalProcessed: number;
    private totalSuccess: number;
    private totalFailures: number;

    constructor(
        @Inject(forwardRef(() => PayableService)) private readonly payableService: PayableService,
        private readonly mailerService: MailerService
    ) {
        this.tentatives = 0;
        this.totalProcessed = 0;
        this.totalSuccess = 0;
        this.totalFailures = 0;
    }

    async onModuleInit() {
        this.logger.log("Init amqp connection");
        this.connection = amqp.connect([process.env.RABBITMQ_URI || 'amqp://localhost:5672']);
        this.channelWrapper = this.connection.createChannel({
            setup: async (channel) => {
                await channel.assertQueue('payables_queue', { durable: true });
                await channel.assertQueue('dead_letter_queue', { durable: true });
                this.logger.log("Created channel");
                channel.consume('payables_queue', async (msg) => {
                    this.logger.log("Message received, msg:", msg);
                    if (msg !== null) {
                        this.logger.log("Message is not null");
                        const payable: any = JSON.parse(msg.content.toString());
                        this.logger.log("Payable:", payable);

                        // why I'm receiving in different format? Take a look when I have patiente. 
                        if (payable.pattern == "payables_queue") {
                            await this.handleProcessPayable(payable.data, msg, channel);
                        } else {
                            await this.handleProcessPayable(payable, msg, channel);            
                        }
                    }
                });
            },
        });
        this.logger.log('RabbitMQ connection established');
    }

    async handleProcessPayable(payable: PayableType, msg, channel) {
        const headers = msg.properties.headers || {};
        const retryCount = headers['x-retry-count'] || 0;
        this.logger.log(`Processing payable: ${JSON.stringify(payable)}, Retry Count: ${retryCount}`);

        // Verificação dos campos obrigatórios
        if (!payable.description || !payable.amount || !payable.dueDate || !payable.assignorId) {
            this.logger.error(`Invalid payable data: ${JSON.stringify(payable)}`);
            channel.ack(msg);
            this.totalFailures += 1;
            this.totalProcessed += 1;
            await this.handleBatchCompleted(this.totalProcessed, this.totalSuccess, this.totalFailures);
            return;
        }

        try {
            // await this.payableService.create(payable);
            await this.payableService.createOne(payable);
            channel.ack(msg);
            this.tentatives = 0;
            this.totalSuccess += 1;
            this.totalProcessed += 1;
            this.logger.log(`Payable processed successfully: ${JSON.stringify(payable)}`);
            await this.handleBatchCompleted(this.totalProcessed, this.totalSuccess, this.totalFailures);
        } catch (error) {
            this.logger.error(`Error processing payable: ${JSON.stringify(payable)}, Error: ${error.message}`);
            this.tentatives += 1;
            this.totalFailures += 1;
            this.totalProcessed += 1;
            if (this.tentatives >= this.maxRetries) {
                channel.sendToQueue('dead_letter_queue', Buffer.from(JSON.stringify(payable)));
                await this.mailerService.sendMail({
                    to: 'operations@example.com',
                    subject: 'Payable Processing Failed',
                    template: './payable-failed',
                    context: { payable: JSON.stringify(payable, null, 2) },
                });
                channel.ack(msg);
            } else {
                channel.nack(msg, false, false);
                channel.sendToQueue('payables_queue', Buffer.from(JSON.stringify(payable)), {
                    headers: { 'x-retry-count': retryCount + 1 },
                });
            }
            await this.handleBatchCompleted(this.totalProcessed, this.totalSuccess, this.totalFailures);
        }
    }

    async handleBatchCompleted(total: number, success: number, failures: number) {
        this.logger.log(`Batch Completed - Total: ${total}, Success: ${success}, Failures: ${failures}`);
        await this.mailerService.sendMail({
            to: 'client@example.com',
            subject: 'Batch Processing Completed',
            template: './batch-done',
            context: {
                total,
                success,
                failures,
            },
        });
    }
}
