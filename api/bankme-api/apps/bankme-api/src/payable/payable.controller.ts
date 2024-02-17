import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayableService } from './payable.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ListPayableDto } from './dto/list-payable.dto';

@Controller('payable')
@ApiTags('Payable')
export class PayableController {
  @ApiOperation({ summary: 'Payable' })
    constructor(private readonly payableService: PayableService) { }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create a payable',
    type: CreatePayableDto
  })
  create(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list all payables',
    type: ListPayableDto
  })
  findAll() {
    return this.payableService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get Payable by Id',
    type: CreatePayableDto
  })
  findOne(@Param('id') id: string) {
    return this.payableService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Change payable by Id',
    type: UpdatePayableDto
  })
  update(@Param('id') id: string, @Body() updatePayableDto: UpdatePayableDto) {
    return this.payableService.update(+id, updatePayableDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Remove payable By Id',
    type: CreatePayableDto
  })
  remove(@Param('id') id: string) {
    return this.payableService.remove(+id);
  }
}
