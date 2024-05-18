import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';

@Controller()
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  async create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  async getAll() {
    return this.payableService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.payableService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.payableService.delete(id);
  }
}
