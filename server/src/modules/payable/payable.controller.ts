import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(@Body() data: CreatePayableDto) {
    return this.payableService.create({
      data
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(+id);
  }
}
