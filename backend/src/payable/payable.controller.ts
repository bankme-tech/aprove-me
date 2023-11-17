import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { Payable } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto): Promise<Payable> {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  async findAll(): Promise<Payable[]> {
    return this.payableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payable> {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto): Promise<Payable> {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Payable> {
    return this.payableService.remove(id);
  }
}
