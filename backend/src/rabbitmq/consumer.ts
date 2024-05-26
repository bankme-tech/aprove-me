import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import PayableRepository from '../payable/repository/payableRepository';
import { DeadProducerService } from './deadProducer';
import { EmailService } from './email.service';

@Injectable()
export class ConsumerService {
  private static maxRetries = 4;
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly deadProducerService: DeadProducerService,
    private readonly emailService: EmailService,
  ) {}

  async consumeMessage(payables: CreatePayableDto[]) {
    let successPayloads = 0;
    for (const payable of payables) {
      let retries = 0;
      let success = false;

      while (!success && retries < ConsumerService.maxRetries) {
        try {
          await this.payableRepository.create(payable);
          success = true;
        } catch (error) {
          retries++;
        }
      }

      if (!success) {
        await this.deadProducerService.sendToDeadQueue(payable);
        // this.emailService.deniedPayableEmail(payable);
        continue;
      }

      successPayloads++;
    }

    return {
      successPayloads,
      failedPayloads: payables.length - successPayloads,
    };
  }
}
