import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreatePayableUseCase } from '@application/payable/usecases/create-payable.usecase';

import { CreatePayableDto } from '@presentation/payable/dtos/create-payable.dto';
import { PayablePresenter } from '@presentation/payable/presenters/payable.presenter';

@ApiTags('integrations/payable')
@Controller('integrations/payable')
export class PayableController {
  constructor(private readonly _createPayableUseCase: CreatePayableUseCase) {}

  @ApiOperation({ summary: 'Creates a single new payable' })
  @ApiCreatedResponse({ type: PayablePresenter })
  @Post()
  async create(@Body() dto: CreatePayableDto): Promise<PayablePresenter> {
    const res = await this._createPayableUseCase.create(dto);
    return new PayablePresenter(res);
  }
}
