import { OnQueueActive, OnQueueCompleted, OnQueueError, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableService } from './payable.service';

@Processor('payable')
export class PayableConsumer {

    constructor(
        private readonly payableService: PayableService
    ) { }

    @Process('batch-create')
    async batchCreate(job: Job<CreatePayableDto[]>) {
        const { data: payables } = job

        console.time('all')
        for (const payable of payables) {
            console.time('each')
            await this.payableService.create({ data: payable })
            console.timeEnd('each')
        }
        console.timeEnd('all')
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Add job ${job.name}`);
        console.log(job.data)
    }

    @OnQueueCompleted()
    onCompleted(job: Job) {
        console.log(`Completing job ${job.name}`);
        console.log(job.data)
    }

    @OnQueueError()
    onError(job: Job) {
        console.log(`Error job ${job.name}`);
        console.log(job)
    }
}