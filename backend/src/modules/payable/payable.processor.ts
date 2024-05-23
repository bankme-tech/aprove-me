import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Payable } from '@prisma/client';
import { Job } from 'bull';
import { PrismaService } from 'src/config/prisma.service';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { UserPayableService } from '../user-payable/user-payable.service';
import { AssignorService } from './../assignor/assignor.service';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

@Processor('payable')
export class PayableProcessor {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payableService: PayableService,

    private readonly assignorService: AssignorService,
    private readonly userPayableService: UserPayableService,
  ) {}

  @Process('createPayable')
  async handleCreatePayable(
    job: Job<{ data: Omit<PayableDto, 'id'>; user: JwtPayload }>,
  ) {
    try {
      const { data, user } = job.data;

      await this.assignorService.findOne(data.assignorId);

      const payable = await this.prisma.payable.create({
        data,
      });

      await this.userPayableService.create({
        payableId: payable.id,
        userId: user.id,
      });

      return payable;
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
    data: Omit<PayableDto, 'id'>;
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
