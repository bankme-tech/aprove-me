import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PayableService } from './payable.service';
import { Payable } from '@prisma/client';
import { PayablesDto } from './dtos/payables.dto';

@Controller('/integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) { }

  @Post()
  create(@Body() dto: PayablesDto): Promise<Payable> {
    return this.payableService.createPayable(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Payable | null> {
    return this.payableService.getPayableById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: PayablesDto): Promise<Payable> {
    return this.payableService.updatePayable(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Payable> {
    return this.payableService.deletePayable(id);
  }
}

