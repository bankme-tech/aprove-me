import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ProducerService } from 'src/rabbitmq/producer.service';

@UseGuards(AuthGuard)
@Controller()
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly producerService: ProducerService,
  ) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  async findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(id, updatePayableDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.payableService.remove(id);
    return { message: 'Payable deleted' };
  }

  @Post('message')
  async sendMessage(@Body() createPayableDTO: CreatePayableDto) {
    await this.producerService.sendMessage(createPayableDTO);
    return { message: 'Message sent' };
  }
}
