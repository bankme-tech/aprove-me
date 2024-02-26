import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreatePayableBodyDTO } from '../dtos/CreatePayableDTO';

@Injectable()
export class SendPayablesEmailProducer {
  constructor(@InjectQueue('payablesQueue') private payableQueue: Queue) {}

  async sendMail(createPayableDTO: CreatePayableBodyDTO) {
    await this.payableQueue.add('payableJob', createPayableDTO);
  }
}
