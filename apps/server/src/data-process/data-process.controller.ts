import { Payable } from '@/payable/entities/payable.entity'
import { PayableRepository } from '@/payable/repository/payable.repository'
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

type PayableJob = {
  payable: Payable
}

@Processor('process-data')
export class DataProcessConsumer {
  private readonly logger = new Logger(DataProcessConsumer.name)

  constructor(private payableRepository: PayableRepository) {}

  @Process()
  async process(job: Job<PayableJob>) {
    this.logger.log(`Process payable with ${job.id} started`)
    const { payable } = job.data
    const result = Payable.create({
      assignorId: payable.assignorId,
      emissionDate: new Date(payable.emissionDate),
      value: payable.value,
    })
    result.pay()
    job.update({ payable: result })
  }

  @OnQueueActive()
  async activeProcess(job: Job<PayableJob>) {
    this.logger.log(`Process payable with ${job.id} active`)
    const { payable } = job.data
    const result = Payable.create({
      assignorId: payable.assignorId,
      emissionDate: new Date(payable.emissionDate),
      value: payable.value,
    })
    result.status = 'processing'
    job.update({ payable: result })
  }

  @OnQueueError()
  async errorProcess(job: Job<PayableJob>) {
    this.logger.log(`Process payable with ${job.id} error`)
    const { payable } = job.data
    const result = Payable.create({
      assignorId: payable.assignorId,
      emissionDate: new Date(payable.emissionDate),
      value: payable.value,
    })
    result.status = 'error'
    job.update({ payable: result })
    /**
     * SEND MAIL ON PROCESS ERROR WHEN COMPLETE 3 ATTEMPTS
     */
  }

  @OnQueueCompleted()
  async completeProcess(job: Job<PayableJob>) {
    this.logger.log(`Process payable with ${job.id} completed`)
    const { payable } = job.data
    const result = Payable.create({
      assignorId: payable.assignorId,
      emissionDate: new Date(payable.emissionDate),
      value: payable.value,
    })
    result.status = 'complete'
    await this.payableRepository.create(result)
    /**
     * SEND MAIL ON PROCESS COMPLETE
     */
  }
}
