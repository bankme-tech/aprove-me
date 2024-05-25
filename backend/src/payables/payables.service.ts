import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from '../utils';
import { CreatePayableDto } from './dto/create.payable.dto';
import { UpdatePayableDto } from './dto/update.payable.dto';
import { ProducerService } from 'src/queue/producer.service';
import { BatchTrackerService } from 'src/queue/batch-tracker.service';
import { randomUUID } from 'crypto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PayablesService {
  constructor(
    private prisma: PrismaService,
    private produceQueue: ProducerService,
    private batchTracker: BatchTrackerService,
    private emailService: EmailService,
  ) {}

  getPayableById(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async createPayable(createDto: CreatePayableDto) {
    const res = await validateDto(createDto, CreatePayableDto);

    return this.prisma.payable.create({
      data: res,
    });
  }

  async updatePayable(id: string, updateDto: UpdatePayableDto) {
    const result = await validateDto(updateDto, UpdatePayableDto);

    try {
      return await this.prisma.payable.update({
        where: { id },
        data: result,
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('Payable not found');
      }
      throw error;
    }
  }

  async deletePayable(id: string) {
    const payable = await this.getPayableById(id);

    if (!payable) throw new NotFoundException('Payable not found');

    return this.prisma.payable.delete({
      where: { id },
    });
  }

  async batchCreatePayables(createDtos: CreatePayableDto[]) {
    if (!Array.isArray(createDtos)) {
      throw new BadRequestException(
        'You must provide an array of payables to create',
      );
    }

    if (createDtos.length > 10000) {
      throw new BadRequestException(
        'You can only create a maximum of 10000 payables at a time',
      );
    }

    const batchId = randomUUID();

    this.batchTracker.addBatch(batchId, createDtos.length);
    createDtos.forEach(async (createDto) => {
      await this.produceQueue.addToPayableQueue({
        batchId: batchId,
        payable: createDto,
      });
    });

    this.batchTracker.onBatchComplete(batchId, (result) => {
      this.emailService.sendEmail({
        email: `Your batch create payables is complete, ${result.sucessfulMessages} payables were created successfully and ${result.failedMessages} payables failed.`,
        html: `<p>Your batch create payables is complete, ${result.sucessfulMessages} payables were created successfully and ${result.failedMessages} payables failed.</p>`,
        subject: 'Batch create payables complete',
      });
    });

    return {
      message: 'Your batch create payables is in progress',
    };
  }

  async processBatchCreatePayable(createDto: CreatePayableDto | any) {
    await validateDto(createDto, CreatePayableDto);
    await this.createPayable(createDto);
  }
}
