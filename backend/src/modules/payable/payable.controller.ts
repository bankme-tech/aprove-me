import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

// TODO: Fix documentation of Payable
@ApiTags('Payable')
@Controller({ path: 'integrations/payable', version: '1' })
export class PayableController extends CrudStrategyController<any, any, any> {
  constructor(private readonly payableService: PayableService) {
    super(payableService);
  }

  @Post()
  @ApiBody({ type: OmitType(PayableDto, ['id']) })
  @HttpCode(201)
  async create(@Body() createDto: Omit<PayableDto, 'id'>): Promise<Payable> {
    return await this.payableService.create(createDto);
  }

  @Patch(':id')
  @ApiBody({ type: OmitType(PayableDto, ['id']) })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Omit<PayableDto, 'id'>,
  ): Promise<Payable> {
    return await this.payableService.update(id, updateDto);
  }
}
