import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayableService } from './payable.service';
import { Prisma } from '@prisma/client';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(@Body() createPayableDto: Prisma.PayableCreateInput) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: Prisma.PayableUpdateInput) {
    return this.payableService.update(+id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(+id);
  }
}
