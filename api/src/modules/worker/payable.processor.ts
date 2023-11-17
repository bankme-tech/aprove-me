import { Inject, Injectable, Logger } from '@nestjs/common';
import { PayableService } from '../payable/payable.service';
import { IPayableService } from '../payable/interfaces/payable.service.interface';
import { Process, Processor } from '@nestjs/bull';

@Injectable()
@Processor('create_payable')
export class PayableProcessor {
  constructor(
    @Inject(PayableService) private readonly payableService: IPayableService,
    private readonly logger: Logger,
  ) {}

  @Process('payables')
  async handleQueueCompleted(msg: any): Promise<void> {
    let successCount = 0;
    let failureCount = 0;

    for (const payable of msg.data) {
      try {
        await this.payableService.create(payable);
        successCount++;
      } catch (error) {
        failureCount++;
      }
    }

    this.logger.log(
      `Batch processed. Success: ${successCount}, Failures: ${failureCount}`,
    );
  }
}
