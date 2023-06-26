import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BatchProducerService {
    constructor(@InjectQueue('batchQueue') private batchQueue: Queue) { }

    async createPayable(payable) {
        await this.batchQueue.add('batchJob', payable, { attempts: 4 })
    }
}
