import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Payable } from '@prisma/client';
import { Job } from 'bull';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@Processor('payable')
export class PayableProcessor {
  constructor(private readonly payableService: PayableService) {}

  @Process('createPayable')
  async handleCreatePayable(
    job: Job<{ data: Omit<PayableDto, 'id'>[]; user: JwtPayload }>,
  ) {
    try {
      const { data, user } = job.data;

      if (data.length > 10000) {
        throw new Error('Exceeded the maximum allowed');
      }

      for (const payable of data) {
        await this.payableService.create(payable, user);
      }

      if (data.length >= 10) {
        return 'Successful';
      }

      // return await this.mailerService.sendMail({
      //   to: user.email,
      //   subject: 'Payable Processing Complete',
      //   text: `Yours Payable are saved successfully`,
      // });
    } catch (error) {
      if (job.attemptsMade < 4) {
        await job.retry();

        return;
      }

      await job.moveToFailed({ message: error.message }, true);
      await this.sendEmailToOperations(job.data);
    }
  }
  async sendEmailToOperations(data: {
    data: Omit<PayableDto, 'id'>[];
    user: JwtPayload;
  }) {
    console.log('🚀 ~ PayableProcessor ~ data:', data);
    // Fake service email
    // await this.mailerService.sendMail({
    //   to: 'operations@example.com',
    //   subject: 'Payable Processing Failure',
    //   text: `Payable processing failed after maximum attempts for data: ${JSON.stringify(data)}`,
    // });
  }

  @OnQueueFailed()
  async handleFailedJob(job: Job<PayableDto>, error: Error) {
    return error.message;
  }

  @OnQueueCompleted({ name: 'createPayable' })
  async onQueueCompletedCreatePayable(job: any, res: Payable) {
    this.payableService.setResult(res);

    return res;
  }
}
