import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PayableService } from './payable.service';
import { Payable, Prisma } from '@prisma/client';
import { CreatePayableAssignorDto } from './payable.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RabbitMqService } from 'src/rabbit-mq/rabbit-mq.service';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly rabbitMqService: RabbitMqService
  ) {}

  @Post()
  create(@Body() createPayableDto: CreatePayableAssignorDto) {
    return this.payableService.create(createPayableDto);
  }

  @Post("batch")
  async createBatchToBeProcessed(@Body() payables: Omit<Payable, 'id'>[]) {
    if (payables.length > 1000) {
      throw new Error('Batch size exceed.');
    }

    await this.rabbitMqService.addPayableToQueue(payables)

    return {
      message: "all payable is being processed"
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: Prisma.PayableUpdateInput) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
