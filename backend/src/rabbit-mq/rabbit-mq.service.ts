import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Payable } from '@prisma/client';
import { parseArgs } from 'util';
import amqp, { AmqpConnectionManager, ChannelWrapper } from "amqp-connection-manager";


@Injectable()
export class RabbitMqService {
    private readonly logger = new Logger(RabbitMqService.name);
    connection: AmqpConnectionManager;
    constructor(@Inject('BANK_ME_PAYABLE_SERVICE') readonly client : ClientProxy) {
        this.client = client
        this.connection = amqp.connect([process.env.RABBITMQ_URI || 'amqp://localhost:5672']);
    }

    async addPayableToQueue(payables : Partial<Payable>[]) {
        this.logger.log("Adding to queue")
        payables.forEach(el => {
            this.client.emit('payables_queue', el)
        })
    }
}
