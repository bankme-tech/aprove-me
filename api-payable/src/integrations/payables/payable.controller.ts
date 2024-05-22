import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { PayableService } from './payable.service';
import { PayableDto } from './dtos/payables.dto';
import { PartialPayableDto } from './dtos/partial-payable.dto';

@Controller('/integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) { }

  @Post()
  async create(@Body() dto: PayableDto): Promise<Payable> {
    return this.payableService.createPayable(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: PartialPayableDto,
  ): Promise<Payable> {
    return this.payableService.updatePayable(id, data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payable | null> {
    const payable = await this.payableService.getPayableById(id);
    if (!payable) {
      throw new NotFoundException(`Payable not found. Id: ${id}`);
    }
    return payable;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Payable> {
    return this.payableService.deletePayable(id);
  }
}

