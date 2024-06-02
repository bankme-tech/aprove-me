import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RegisterPayableDto } from '../dtos';
import { ApiPath, ApiPayableTag } from '../../constants';
import { RegisterPayableUseCase } from '@core/payable/usecases';
import {
  PayableVMResponse,
  PayableViewModel,
} from '@infra/http/adapters/view-model/payable';

@ApiBearerAuth()
@ApiTags(ApiPayableTag)
@Controller(ApiPath)
export class RegisterPayableController {
  constructor(
    private readonly registerPayableUseCase: RegisterPayableUseCase,
  ) {}

  @ApiOperation({
    summary: 'Register Payable',
    description: 'Creates a new payable record in the system.',
  })
  @ApiBody({
    description: 'Properties to register a payable',
    type: RegisterPayableDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'A payable has been successfully registered',
    type: PayableVMResponse,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid input data',
  })
  @Post('payable')
  public async registerPayable(
    @Body() dto: RegisterPayableDto,
  ): Promise<PayableVMResponse> {
    const payable = await this.registerPayableUseCase.execute(dto);

    return PayableViewModel.toHTTP(payable);
  }
}
