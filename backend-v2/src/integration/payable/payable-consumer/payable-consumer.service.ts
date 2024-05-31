import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { RabbitMqFactoryService } from 'src/queue/rabbit-mq.service';

@Injectable()
export class PayableConsumerService implements OnModuleInit {
    private readonly logger = new Logger(PayableConsumerService.name);

    constructor(private readonly rabbitMqFactoryService: RabbitMqFactoryService) { 
        
    }

    onModuleInit() {
        const consumer = this.rabbitMqFactoryService.createConsumer<Payable>({
            retries: 3,
            interval: 1000,
            queueName: 'payables',
            consumerTag: 'payable-consumer',
            noAck: false,
            prefetchCount: 1,
            noLocal: false,
            exclusive: false,
            args: {},
            onConsumeError: (error) => this.logger.error('Consume Error:', error),
            onFailure: (error) => this.logger.error('Processing Failed:', error),
        });

        consumer.addPayableListener(this.onMessageReceived.bind(this));
    }

    private async onMessageReceived(payable: Payable) {
        // Process the payable and send an email
        this.logger.log("enviando email:", payable)
        // await this.mailerService.sendMail({
        //     to: 'recipient@example.com',
        //     subject: 'New Payable Created',
        //     template: 'payable-template', // e.g., 'payable-created'
        //     context: { payable },
        // });
    }
}
