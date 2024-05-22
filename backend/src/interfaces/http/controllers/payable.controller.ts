import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PayableService } from 'src/domain/services/payable.service';
import { CreatePayableDto } from 'src/application/dtos/create-payable.dto';
import { Payable } from 'src/domain/entities/payable.entity';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get()
  initial(): string {
    return 'Hello From Payable!';
  }

  @Get("all")
  async findAll() {
    return this.payableService.findAll();
  }

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.createPayable(createPayableDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.payableService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payable: Payable) {
    return this.payableService.update(id, payable);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.payableService.delete(id);
  }
}
