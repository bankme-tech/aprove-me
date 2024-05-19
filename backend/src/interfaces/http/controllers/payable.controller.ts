import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PayableService } from 'src/domain/services/payable.service';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get()
  initial(): string {
    return "Hello From Payable!"
  }

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.createPayable(createPayableDto);
  }

  @Get(":id")
  async findById(@Param('id') id: string){
    return this.payableService.findById(id);
  }
}