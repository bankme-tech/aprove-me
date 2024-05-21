import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { Payable } from './entities/payable.entity';
import { ProducerService } from 'src/rabbitmq/producer.service';

@Controller('payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly producerService: ProducerService,
  ) {}

  @Post()
  create(@Body() createPayableDto: CreatePayableDto): Promise<Payable> {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  findAll(): Promise<Payable[]> {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payable> {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }

  @Post('batch')
  async sendMessage(@Body() batch: { payables: CreatePayableDto[] }) {
    const { payables } = batch;
    await this.producerService.sendToPayableQueue(payables);
    return { message: 'Batch sent' };
  }
}
