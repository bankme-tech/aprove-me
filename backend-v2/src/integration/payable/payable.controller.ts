import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit, Query } from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { RabbitMqFactoryService, RabbitMqProducer } from 'src/queue/rabbit-mq.service';


@Controller('payables')
export class PayableController implements OnModuleInit {
  producer: RabbitMqProducer<CreatePayableDto>;
  constructor(
    private readonly payableService: PayableService,
    private readonly rabbitMqFactoryService: RabbitMqFactoryService
  ) {}
  

  onModuleInit() {
    this.producer = this.rabbitMqFactoryService.createProducer<CreatePayableDto>('payables');
  }

  @Post()
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Post('bulk')
  async createMany(@Body() createPayableDtos: CreatePayableDto[]) {
    await this.producer.addToQueue(createPayableDtos);
    return { message: 'Payables are being processed' };
  }
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.payableService.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
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
}
