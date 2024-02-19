import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateReceivableBatchDto } from 'src/domain/dtos';
import logger from 'src/utils/logger';
import { RECEIVABLE_QUEUE } from '../constants';
import { CreateReceivableUseCase } from '../use-cases';

@Processor(RECEIVABLE_QUEUE)
export class ReceivableBatchConsumer {
  private error: number = 0;

  constructor(
    private readonly mailerService: MailerService,
    private createReceivableUseCase: CreateReceivableUseCase,
  ) {}

  @Process('create-receivable-job')
  async createReceivables(job: Job<CreateReceivableBatchDto>) {
    const { data } = job;
    logger.info('Starting to create receivable');
    const createAllReceivables = data.receivable_batch.map(
      async (receivable) =>
        await this.createReceivableUseCase.execute(receivable),
    );
    await Promise.all(createAllReceivables);
    logger.info(`Create receivable completed for job ${job.id}`);
  }

  @OnQueueError()
  onError(error: Error) {
    this.error = this.error++;
    logger.error(error.message);
  }

  @OnQueueCompleted()
  async onCompleted({ id, data }: Job<CreateReceivableBatchDto>) {
    const receivable_batch = data.receivable_batch;

    await this.mailerService.sendMail({
      to: 'fake@email.com',
      from: 'Aprovar-me <aprovar-me@bank.me>',
      subject: `Fila de recebeiveis completa - Job n${id}`,
      text: `Fila completa com ${receivable_batch.length - this.error} sucessos e ${this.error} erros`,
    });
    this.error = 0;
    logger.info('Email enviado');
  }
}
