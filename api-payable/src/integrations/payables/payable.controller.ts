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
  ParseIntPipe,
} from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PayableService } from './payable.service';
import { PayableDto } from './dtos/payables.dto';
import { PartialPayableDto } from './dtos/partial-payable.dto';
import { MessagePattern } from '@nestjs/microservices';
import {
  PayableQueueProvider,
  PATTERN_PAYABLE_BATCH,
  PayableBatchMessage,
} from 'src/microservices/rmq/payable-queue.service';
import { BatchPayableDto } from './dtos/batch-payable.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Controller('/integrations/payable')
export class PayableController {
  constructor(
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
    return this.payableService.updatePayable(id, dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payable | null> {
    const payable = await this.payableService.getPayableById(id);
    if (!payable) {
      throw new NotFoundException(`Payable not found. Id: ${id}`);
    }
    return payable;
  }

  @Get()
  async getPage(@Query() queryDto: PaginationDto) {
    const { page, limit, cursorId } = queryDto;
    console.log(`[Log:queryDto]:`, queryDto);
    const pagination = await this.payableService.getPage({
      page,
      limit,
      cursorId,
      includeAssignor: false,
    });
    return pagination;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Payable> {
    return this.payableService.deletePayable(id);
  }

  @Post('batch')
  async emitPayableBatch(@Body() dto: BatchPayableDto) {
    const promises = dto.payables.map(async (p) => {
      return this.payableQueueProvider.sendBatch({ data: p });
    });

    let fulfilledCount = 0;
    const rejectedValues: PromiseSettledResult<PayableDto>[] = [];
    const promiseResults = await Promise.allSettled(promises);
    for (const result of promiseResults) {
      if (result.status === 'fulfilled') {
        fulfilledCount++;
      }
      else if (result.status === 'rejected') {
        const throwedErrorMessage = result.reason.message;
        if (throwedErrorMessage) {
          rejectedValues.push(throwedErrorMessage);
        } else {
          rejectedValues.push(result.reason);
        }
      }
    }

    return { fulfilledCount, rejectedValues };
  }

  /** Consume values emitted by {@link PayableQueueProvider['sendBatch']}. */
  @MessagePattern(PATTERN_PAYABLE_BATCH)
  public async consumePayableBatch(msg: PayableBatchMessage): Promise<void> {
    await this.payableService.createPayable(msg.data);
  }
}
