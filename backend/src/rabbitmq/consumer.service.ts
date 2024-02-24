import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import PayableRepository from '../payable/repositories/payableRepository';
import { DeadProducerService } from './dead-producer.service';

@Injectable()
export class ConsumerService {
  private static maxRetries = 4;
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly deadProducerService: DeadProducerService,
  ) {}

  async consumeMessage(content: CreatePayableDto[]) {
    for (const payable of content) {
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
      }
    }
  }
}

// exponential backoff strategy
