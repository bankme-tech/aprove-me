import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ProducerService } from 'src/rabbitmq/producer';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly producerService: ProducerService,
  ) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Post('batch')
  async sendMessage(@Body() payables: CreatePayableDto[]) {
    if (payables.length > 10000) {
      throw new BadRequestException('Batch limit exceeded');
    }
    await this.producerService.sendMessage(payables);
    return { message: 'Batch sent' };
  }

  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
