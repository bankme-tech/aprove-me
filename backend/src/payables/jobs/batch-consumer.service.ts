import { InjectQueue, OnGlobalQueueCompleted, OnGlobalQueueResumed, OnQueueActive, OnQueueCompleted, OnQueueDrained, Process, Processor } from '@nestjs/bull';
import { CreatePayableDto } from '../dto/create-payable.dto';
import { PayablesService } from '../payables.service';
import { Job, Queue } from 'bull';
import { log } from 'console';

@Processor('batchQueue')
export class BatchConsumerService {
    constructor(
        private readonly payablesService: PayablesService,
        @InjectQueue('batchQueue') private batchQueue: Queue
    ) { }

    @Process('batchJob')
    async create(job: Job<CreatePayableDto>) {
        const { data: { value, assignorId } } = job;
        try {
            await this.payablesService.create({
                value,
                assignor: { connect: { id: assignorId } }
            });
        } catch (error) {
            await job.moveToFailed({ message: 'Job failed' })

        }
    }

    @OnQueueDrained()
    async sendEmail(): Promise<void> {
        
        const failedJobs  = await this.batchQueue.getFailed()
        const completedJobs = await this.batchQueue.getCompleted()

        const emailMessage = `Lote processado, Sucesso(${completedJobs.length - failedJobs.length}) | Falhas(${failedJobs.length})`;
        const promises = []

        const sendEmailPromise = Promise.resolve(emailMessage)
        promises.push(sendEmailPromise)

        for (const failed of failedJobs) {
            promises.push(failed.remove())
        }
        for (const completed of completedJobs) {
            promises.push(completed.remove())
        }
        
        await Promise.all(promises)        
    }
}
