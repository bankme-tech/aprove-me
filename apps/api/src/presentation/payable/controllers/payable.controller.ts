import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Payable } from '@domain/payable/models/payable';

import { CreatePayableUseCase } from '@application/payable/usecases/create-payable.usecase';
import { PayableByIdPipe } from '@application/payable/pipes/payable-by-id.pipe';
import { FindOnePayableUseCase } from '@application/payable/usecases/find-one-payable-by-id.usecase';
import { UpdateOnePayableUseCase } from '@application/payable/usecases/update-one-assignor.usecase';

import { CreatePayableDto } from '@presentation/payable/dtos/create-payable.dto';
import { PayablePresenter } from '@presentation/payable/presenters/payable.presenter';
import { UpdatePayableDto } from '@presentation/payable/dtos/update-payable.dto';

@ApiTags('integrations/payable')
@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly _createPayableUseCase: CreatePayableUseCase,
    private readonly _findOnePayableUseCase: FindOnePayableUseCase,
    private readonly _updateOnePayableUseCase: UpdateOnePayableUseCase,
  ) {}

  @ApiOperation({ summary: 'Creates a single new payable' })
  @ApiCreatedResponse({ type: PayablePresenter })
  @Post()
  async create(@Body() dto: CreatePayableDto): Promise<PayablePresenter> {
    const result = await this._createPayableUseCase.create(dto);
    return new PayablePresenter(result);
  }

  @ApiOperation({ summary: 'Retrieves a single payable given its id' })
  @ApiOkResponse({ type: PayablePresenter })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async find(
    @Param('id', PayableByIdPipe) payable: Payable,
  ): Promise<PayablePresenter> {
    const result = await this._findOnePayableUseCase.find(payable);
    return new PayablePresenter(result);
  }

  @ApiOperation({ summary: 'Updates a single payable given its id' })
  @ApiOkResponse({ type: PayablePresenter })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  async update(
    @Body() dto: UpdatePayableDto,
    @Param('id', PayableByIdPipe) payable: Payable,
  ): Promise<PayablePresenter> {
    const result = await this._updateOnePayableUseCase.update(dto, payable);
    return new PayablePresenter(result);
  }
}
