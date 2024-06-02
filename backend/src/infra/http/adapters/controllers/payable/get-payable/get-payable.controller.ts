import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetPayableUseCase } from '@core/payable/usecases';
import { ApiPath, ApiPayableTag } from '../../constants';
import {
  PayableVMResponse,
  PayableViewModel,
} from '@infra/http/adapters/view-model/payable';

@ApiBearerAuth()
@ApiTags(ApiPayableTag)
@Controller(ApiPath)
export class GetPayableController {
  constructor(private readonly getPayableUseCase: GetPayableUseCase) {}

  @ApiOperation({
    summary: 'Get Payable by ID',
    description: 'Retrieves a payable record by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Payable ID',
    required: true,
    type: String,
  })
  @Get('payable/:id')
  public async getPayableById(
    @Param('id') id: string,
  ): Promise<PayableVMResponse> {
    const payable = await this.getPayableUseCase.execute(id);
    return PayableViewModel.toHTTP(payable);
  }
}
