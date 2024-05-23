import { IUseCase } from '@/core/use-cases/interfaces';
import { Injectable } from '@nestjs/common';
import { CreatePayablesBatchDto } from '../infra/http/dtos/create-payables-batch.dto';
import { CreatePayableProducerJob } from '../infra/jobs/create-payable-producer.job';

@Injectable()
export class CreatePayablesBatchUseCase implements IUseCase {
  constructor(private createPayableProducerJob: CreatePayableProducerJob) {}

  public async execute({ payables }: CreatePayablesBatchDto) {
    payables.forEach((p) => {
      this.createPayableProducerJob.execute(p);
    });
  }
}
