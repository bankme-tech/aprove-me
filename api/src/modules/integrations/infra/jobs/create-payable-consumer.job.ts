import { IUseCase } from '@/core/use-cases/interfaces';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatePayableDto } from '../http/dtos/create-payable.dto';
import { CreatePayableUseCase } from '../../use-cases/create-payable.use-case';

@Processor('create-payable-queue')
export class CreatePayableConsumerJob implements IUseCase {
  constructor(private createPayableUseCase: CreatePayableUseCase) {}

  @Process('create-payable-job')
  public async execute(job: Job<CreatePayableDto>) {
    await this.createPayableUseCase.execute(job.data);
  }
}
