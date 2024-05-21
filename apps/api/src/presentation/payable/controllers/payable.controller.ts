import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Payable } from '@bankme/domain';

import { CreateOnePayableUseCase } from '@application/payable/usecases/create-one-payable.usecase';
import { PayableByIdPipe } from '@application/payable/pipes/payable-by-id.pipe';
import { FindOnePayableUseCase } from '@application/payable/usecases/find-one-payable-by-id.usecase';
import { DeleteOnePayableUseCase } from '@application/payable/usecases/delete-one-payable.usecase';
import { UpdateOnePayableUseCase } from '@application/payable/usecases/update-one-payable.usecase';
import { CreateBulkPayableUseCase } from '@application/payable/usecases/create-bulk-payable.usecase';

import { CreatePayableDto } from '@presentation/payable/dtos/create-payable.dto';
import { PayablePresenter } from '@presentation/payable/presenters/payable.presenter';
import { UpdatePayableDto } from '@presentation/payable/dtos/update-payable.dto';

@ApiTags('integrations/payable')
@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly _createOnePayableUseCase: CreateOnePayableUseCase,
    private readonly _createBulkPayableUseCase: CreateBulkPayableUseCase,
    private readonly _findOnePayableUseCase: FindOnePayableUseCase,
    private readonly _updateOnePayableUseCase: UpdateOnePayableUseCase,
    private readonly _deleteOnePayableUseCase: DeleteOnePayableUseCase,
  ) {}

  @ApiOperation({ summary: 'Creates a single new payable' })
  @ApiCreatedResponse({ type: PayablePresenter })
  @Post()
  async create(@Body() dto: CreatePayableDto): Promise<PayablePresenter> {
    const result = await this._createOnePayableUseCase.create(dto);
    return new PayablePresenter(result);
  }

  @ApiOperation({ summary: 'Creates many new payable' })
  @ApiOkResponse()
  @ApiBody({ type: CreatePayableDto, isArray: true })
  @Post('batch')
  async batch(@Body(ParseArrayPipe) dtos: CreatePayableDto[]): Promise<void> {
    await this._createBulkPayableUseCase.create(dtos);
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

  @ApiOperation({ summary: 'Updates a single payable given its id' })
  @ApiOkResponse({ type: PayablePresenter })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async delete(@Param('id', PayableByIdPipe) payable: Payable): Promise<void> {
    await this._deleteOnePayableUseCase.delete(payable);
  }
}
