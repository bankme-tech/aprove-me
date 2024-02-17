import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateReceivableBatchDto, CreateReceivableDto } from 'src/domain/dtos';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateReceivableUseCase } from '../use-cases';
import { Receivable } from 'src/domain/entities';
import logger from 'src/utils/logger';

/* Controller recebe a requisicao com um array de receivables 

*/

@Processor('receivable-queue')
export class ReceivableBatchConsumer {
  constructor(
    private readonly mailerService: MailerService,
    private createReceivableUseCase: CreateReceivableUseCase,
  ) {}

  @Process('create-receivable-job')
  async createReceivables(job: Job<CreateReceivableDto>) {
    const { data } = job;

    logger.info('Starting to create receivable');

    await this.createReceivableUseCase.execute(data);
  }

  @OnQueueError()
  onError(error: Error) {
    logger.error(error.message);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<CreateReceivableBatchDto>) {
    await this.mailerService.sendMail({
      to: 'fake@email.com',
      from: 'Aprovar-me <aprovar-me@bank.me>',
      subject: 'Fila de recebeiveis completa',
      text: 'Fila completa com 0 erros',
    });
    logger.info('Email enviado');
  }
}
