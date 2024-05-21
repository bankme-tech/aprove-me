import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';

import { DeadProducerService } from './dead-producer.service';
import PayableRepository from 'src/payable/repositories/payable.repository';
import { INITIAL_DELAY, MAX_RETRIES } from './constants';

@Injectable()
export class ConsumerService {
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly deadProducerService: DeadProducerService,
  ) {}

  private async exponentialBackoff(
    fn: () => Promise<any>,
    retries: number,
    delay: number,
  ): Promise<any> {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      return this.exponentialBackoff(fn, retries - 1, delay * 2);
    }
  }

  async consumeMessage(content: CreatePayableDto[]) {
    console.log('Consuming message');
    let countSuccess = 0;
    let countError = 0;
    for (const payable of content) {
      try {
        await this.exponentialBackoff(
          () => this.payableRepository.create(payable),
          MAX_RETRIES,
          INITIAL_DELAY,
        );
        console.log('Payable created');
        countSuccess++;
      } catch (error) {
        console.error('Error creating payable', error);
        countError++;
        await this.deadProducerService.sendToDeadQueue(payable);
        //TODO: send email to operations team
      }
      //TODO: send email with batch results (countSuccess, countError)
    }
  }
}
