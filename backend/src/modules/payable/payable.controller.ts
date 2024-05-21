import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import { CreatePayableDto } from './payable.dto';
import { PayableService } from './payable.service';

@Controller({ version: '1' })
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  // TODO: test assertions functions
  @Post('/integrations/payable')
  @HttpCode(201)
  async create(@Body() body: CreatePayableDto): Promise<Payable> {
    return await this.payableService.createPayable(body);
  }

  @Get('/integrations/payable/:id')
  @ApiParam({ name: 'id', type: 'string', description: 'ID do payable' })
  async getOne(
    @Param('id') id: Pick<CreatePayableDto, 'id'>['id'],
  ): Promise<Payable> {
    return this.payableService.findOne(id);
  }
}
