import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  AssignorVMResponse,
  AssignorViewModel,
} from '@infra/http/adapters/view-model/assignor';
import { ApiPath, ApiAssignorTag } from '../../constants';
import { GetAssignorUseCase } from '@core/assignor/usecases';

@ApiBearerAuth()
@ApiTags(ApiAssignorTag)
@Controller(ApiPath)
export class GetAssignorController {
  constructor(private readonly getAssignorUseCase: GetAssignorUseCase) {}

  @ApiOperation({
    summary: 'Get Assignor by ID',
    description: 'Retrieves an assignor record by its ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Assignor ID',
    required: true,
    type: String,
  })
  @Get('assignor/:id')
  public async getAssignorById(
    @Param('id') id: string,
  ): Promise<AssignorVMResponse> {
    const assignor = await this.getAssignorUseCase.execute(id);

    return AssignorViewModel.toHTTP(assignor);
  }
}
