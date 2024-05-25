import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PayableService } from './payable.service';
import { Payable, Prisma } from '@prisma/client';
import { CreatePayableAssignorDto } from './payable.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { AssignorService } from 'src/assignor/assignor.service';

@UseGuards(AuthGuard)
@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    // private readonly assignorService: AssignorService,
    private readonly rabbitMqService: RabbitMqService
  ) {}

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPayableDto: CreatePayableAssignorDto) {
    return this.payableService.create(createPayableDto);
  }

  // @UseGuards(AuthGuard)
  @Post("batch")
  async createBatchToBeProcessed(@Body() payables: Partial<Payable>[]) {
    if (payables.length > 1000) {
      throw new Error('Batch size exceed.');
    }

    await this.rabbitMqService.addPayableToQueue(payables)

    return {
      message: "all payable is being processed"
    }
  }

  // @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  // @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: Prisma.PayableUpdateInput) {
    return this.payableService.update(id, updatePayableDto);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
