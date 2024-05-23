import { Injectable, OnModuleInit, Inject, forwardRef } from "@nestjs/common";
import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";
import { MailerService } from "src/mailer/mailer.service";
import { PayableService } from "src/payable/payable.service";

@Injectable()
export class PayableProcessor implements OnModuleInit {
    private readonly maxRetries = 4;
    private connection: AmqpConnectionManager;
    private channelWrapper: ChannelWrapper;

    constructor(
        @Inject(forwardRef(() => PayableService)) private readonly payableService: PayableService,
        private readonly mailerService: MailerService
    ) {}

    async onModuleInit() {
        this.connection = amqp.connect([process.env.RABBITMQ_URI || 'amqp://localhost:5672']);
        this.channelWrapper = this.connection.createChannel({
            setup: async (channel) => {
                await channel.assertQueue('payables_queue', { durable: true });
                await channel.assertQueue('dead_letter_queue', { durable: true });

                channel.consume('payables_queue', async (msg) => {
                    if (msg !== null) {
                        const payable = JSON.parse(msg.content.toString());
                        await this.handleProcessPayable(payable, msg.fields.redelivered, channel, msg);
                    }
                });
            },
        });
    }

    async handleProcessPayable(payable, redelivered, channel, msg) {
        try {
            await this.payableService.create(payable);
            channel.ack(msg);
        } catch (error) {
            if (redelivered >= this.maxRetries) {
                channel.sendToQueue('dead_letter_queue', Buffer.from(JSON.stringify(payable)));
                await this.mailerService.sendMail({
                    to: 'operations@example.com',
                    subject: 'Payable Processing Failed',
                    template: './payable-failed',
                    context: { payable },
                });
                channel.ack(msg);
            } else {
                channel.nack(msg, false, true);
            }
        }
    }

    async handleBatchCompleted(total, success, failures) {
        await this.mailerService.sendMail({
            to: 'client@example.com',
            subject: 'Batch Processing Completed',
            template: './batch-completed',
            context: {
                total,
                success,
                failures,
            },
        });
    }
}
