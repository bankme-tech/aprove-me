import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, OmitType, PickType } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import { CreatePayableDto } from './payable.dto';
import { PayableService } from './payable.service';

@Controller({ version: '1' })
export class PayableController {
  constructor(private readonly payableService: PayableService) {}

  @Get('/integrations/payable/:id')
  @ApiParam({
    name: 'id',
    type: PickType(CreatePayableDto, ['id'])['id'],
    description: 'ID do payable',
  })
  async findOne(
    @Param('id') id: Pick<CreatePayableDto, 'id'>['id'],
  ): Promise<Payable> {
    return await this.payableService.findOne(id);
  }

  // TODO: test assertions functions
  @Post('/integrations/payable')
  @ApiBody({ type: OmitType(CreatePayableDto, ['id']) })
  @HttpCode(201)
  async create(@Body() body: Omit<CreatePayableDto, 'id'>): Promise<Payable> {
    return await this.payableService.create(body);
  }
}
