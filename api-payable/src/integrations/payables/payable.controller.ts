import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PayableService } from './payable.service';
import { PayableDto } from './dtos/payables.dto';
import { PartialPayableDto } from './dtos/partial-payable.dto';
import { MessagePattern } from '@nestjs/microservices';
import {
  PayableQueueProvider,
  ROUTE_PAYABLE_BATCH,
  PayableBatchMessage,
  PAYABLE_BATCH_QUEUE,
} from 'src/microservices/rmq/payable-queue.service';
import { BatchPayableDto } from './dtos/batch-payable.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { ROUTE_PAYABLE_BATCH_DEAD_LETTER } from 'src/microservices/rmq/payable-dead-letter-queue.service';
import { EmailService } from 'src/services/email/email.service';
import { PayableByIdDto, PayablePaginationDto } from './dtos/payable-pagination.dto';

@Controller("/integrations/payable")
export class PayableController {
  constructor(
    private readonly emailService: EmailService,
    private readonly payableService: PayableService,
    private readonly payableQueueProvider: PayableQueueProvider,
  ) { }

  @Post()
  async create(@Body() dto: PayableDto): Promise<Payable> {
    return this.payableService.createPayable(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: PartialPayableDto,
  ): Promise<Payable> {
    console.log(`[Log:dto]:`, dto);
    return this.payableService.updatePayable(id, dto);
  }

  @Get()
  async getPage(@Query() queryDto: PayablePaginationDto) {
    const { page, limit, cursorId, includeAssignor, selectKeys } = queryDto;
    const pagination = await this.payableService.getPage({
      page,
      limit,
      cursorId,
      includeAssignor,
      selectKeys,
    });
    return pagination;
  }

  @Post('batch')
  async emitPayableBatch(@Body() dto: BatchPayableDto) {
    const FIRST_TRY = 0;
    dto.payables.forEach(async (p) => {
      void this.payableQueueProvider.sendBatch({ data: p, tryCount: FIRST_TRY });
    });

    return { sent: true, queueName: PAYABLE_BATCH_QUEUE };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() queryDto: PayableByIdDto
  ): Promise<Payable | null> {
    const payable = await this.payableService.getPayableById(id, queryDto);
    if (!payable) {
      throw new NotFoundException(`Payable not found. Id: ${id}`);
    }
    return payable;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const payable = await this.payableService.deletePayable(id);
    return { deleted: payable };
  }

  /** Consume values emitted by {@link PayableQueueProvider['sendBatch']}. */
  @MessagePattern(ROUTE_PAYABLE_BATCH)
  public async consumePayableBatch(msg: PayableBatchMessage): Promise<void> {
    try {
      await this.payableService.createPayable(msg.data);
    } catch (err: any) {
      return this.payableQueueProvider.sendBatch(msg);
    }
  }

  /** Consume values emitted by {@link PayableDeadLetterQueueProvider['send']}. */
  @MessagePattern(ROUTE_PAYABLE_BATCH_DEAD_LETTER)
  public async sendPayableBatchEmail(msg: PayableBatchMessage): Promise<void> {
    await this.emailService.sendAssignorEmailToAdmin(msg);
  }
}
