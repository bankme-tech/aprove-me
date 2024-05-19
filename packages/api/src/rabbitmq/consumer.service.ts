import { Injectable, Logger } from '@nestjs/common';
import { DeadProducerService } from './dead-producer.service';
import { CreatePayableDto } from 'src/payable/dto/create-payable.dto';
import { PayableRepository } from '@payable/repositories/payable-repository';

@Injectable()
export class ConsumerService {
  private readonly maxRetries = 4;
  private readonly initialDelay = 1000; // Initial delay in milliseconds

  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly deadProducerService: DeadProducerService,
  ) {}

  async consumeMessage(content: CreatePayableDto[]): Promise<void> {
    for (const payable of content) {
      let success = false;
      let retries = 0;
      let delay = this.calculateDelay(retries);

      while (!success && retries < this.maxRetries) {
        try {
          await this.payableRepository.create(payable);
          success = true;
        } catch (error) {
          retries++;
          delay = this.calculateDelay(retries);
          Logger.warn(`error processing payable (retry ${retries}/${this.maxRetries}): ${error.message}`);
          await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce delay before retry
        }
      }

      if (!success) {
        await this.deadProducerService.sendToDeadQueue(payable);
        Logger.error(`payable processing failed after ${retries} retries. Sent to dead queue.`);
      }
    }
  }

  private calculateDelay(retryAttempt: number): number {
    return Math.min(2 ** retryAttempt * this.initialDelay, 2 * 60 * 1000); // Limit the maximum delay to 2 minutes
  }
}
