import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { PayableService } from './payable.service';
import { BatchCreatePayableDto, CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('payable')
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Post()
  create(@Body() data: CreatePayableDto) {
    return this.payableService.create({
      data
    });
  }

  @Post('/batch')
  async createBatch(
    @Body() data: BatchCreatePayableDto
  ) {
    return await this.payableService.createBatch({ payables: data.payables })
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payableService.findOne({
      id
    });
  }

  @Get()
  findAll(
    @Query() query
  ) {
    let { page = 1, itemsPerPage = 10 } = query
    const { assignorId } = query


    return this.payableService.findAll({
      filters: {
        assignorId
      },
      page: Number(page),
      itemsPerPage: Number(itemsPerPage),
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdatePayableDto,
  ) {
    return this.payableService.update({
      id,
      data
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string
  ) {
    await this.payableService.remove({
      id,
    });

    return {
      message: 'Payable deleted with success'
    }
  }
}
