import { InjectQueue, OnQueueActive, OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableService } from './payable.service';
import { MailerService } from '../../infra/mailer/mailer';
import { AssignorService } from 'modules/assignor/assignor.service';
import { sleep } from '../../utils/sleep';

@Processor('payable')
export class PayableConsumer {
    constructor(
        private readonly payableService: PayableService,
        private readonly assignorService: AssignorService,
        private readonly mailer: MailerService,
        
        @InjectQueue('dead-payable')
        private readonly deadPayableQueue: Queue
    ) { }

    @Process('batch-create')
    async batchCreate(job: Job<CreatePayableDto[]>) {
        let { data: payables } = job
        
        let attempts = 1
        let max_attempts = 3

        for (const payable of payables) {           
            while (attempts <= max_attempts) {
                try {
                    await this.payableService.create({ data: payable })                    
                    break;
                } catch (error) {
                    attempts += 1
                    await sleep(1000)
                }
            }
            
            if(attempts > max_attempts) {
                payable.job_failed = true
            }
            
            attempts = 1
        }
    }

    // ** Job processing each one separately
    // @Process('create')
    // async create (job: Job<CreatePayableDto>) {
    //     const { data: payable } = job
    //     await this.payableService.create({ data: payable })
    // }

    @OnQueueCompleted()
    async onCompleted(job: Job) {
        if(job.name === 'batch-create') {
            const total_items = job.data.length
            const failed_items = job.data.filter(item => item.job_failed)
            if(failed_items.length) {
                await this.deadPayableQueue.add('batch-create-failed', failed_items)
                await this.mailer.sendEmail({ to: 'operacoes@bankme.com' })
            }

            await this.assignorService.sendEmailToId({ id: job.data[0].assignorId })
        }
    }
}