import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Payable } from '@prisma/client';
import { parseArgs } from 'util';

@Injectable()
export class RabbitMqService {
    constructor(@Inject('BANK_ME_PAYABLE_SERVICE') readonly client : ClientProxy) {
        this.client = client
    }

    async addPayableToQueue(payables : Array<Payable>) {
        payables.forEach(el => {
            this.client.emit('process_payable', el)
        })
    }
}
