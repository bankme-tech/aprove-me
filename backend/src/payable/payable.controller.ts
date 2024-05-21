import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PayableService } from './payable.service';
import { Prisma } from '@prisma/client';
import { CreatePayableAssignorDto } from './payable.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(@Body() createPayableDto: CreatePayableAssignorDto) {
    return this.payableService.create(createPayableDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayableDto: Prisma.PayableUpdateInput) {
    return this.payableService.update(id, updatePayableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payableService.remove(id);
  }
}
