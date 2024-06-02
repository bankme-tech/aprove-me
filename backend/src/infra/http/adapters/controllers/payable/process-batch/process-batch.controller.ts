import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ProcessBatchPayableDto } from '../dtos';
import { ApiPath, ApiPayableTag } from '../../constants';
import { ProcessBatchPayableUseCase } from '@core/payable/usecases';

@ApiBearerAuth()
@ApiTags(ApiPayableTag)
@Controller(ApiPath)
export class ProcessBatchPayableController {
  constructor(
    private readonly processBatchPayableUseCase: ProcessBatchPayableUseCase,
  ) {}

  @ApiOperation({
    summary: 'Process batch payable',
    description: 'Receives a batch of payables to be processed asynchronously.',
  })
  @ApiBody({
    description: 'Array of payables to register',
    type: ProcessBatchPayableDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'Batch received and is being processed.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid input data',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('payable/batch')
  public async processBatchPayable(@Body() dto: any): Promise<void> {
    return await this.processBatchPayableUseCase.execute(dto);
  }
}
