import { Process, Processor } from '@nestjs/bull';
import { CreatePayableDto } from './dto/create-payable.dto';
import { Job } from 'bull';
import { PayablesService } from './payables.service';
import { PayableEntity } from './entities/payable.entity';

@Processor('payablesBatch')
export class PayablesBatchConsumer {
  constructor(private readonly payablesService: PayablesService) {}

  @Process('process-payables')
  async handleProcessPayables(job: Job<CreatePayableDto[]>) {
    const payables = job.data;
    return await Promise.all(
      payables.map(async (payable) => {
        return new PayableEntity(await this.payablesService.create(payable));
      }),
    );
  }
}
