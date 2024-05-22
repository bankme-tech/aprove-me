import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { Payable } from '@prisma/client';
import { JwtPayload } from 'src/types/jwt-payload.types';
import { AuthGuard } from '../auth/auth.guard';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import { PayableDto } from './dto/payable.dto';
import { PayableService } from './payable.service';

// TODO: Fix documentation of Payable
@ApiTags('Payable')
@UseGuards(AuthGuard)
@Controller({ path: 'integrations/payable', version: '1' })
export class PayableController extends CrudStrategyController<any, any, any> {
  constructor(private readonly payableService: PayableService) {
    super(payableService);
  }

  @Post()
  @ApiBody({ type: OmitType(PayableDto, ['id']) })
  @HttpCode(201)
  async create(
    @Body() createDto: Omit<PayableDto, 'id'>,
    @Req() req,
  ): Promise<Payable> {
    console.log('🚀 ~ PayableController ~ req:', req);
    return await this.payableService.create(createDto, req.user as JwtPayload);
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
