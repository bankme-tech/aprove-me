import { Body, Controller, Param, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  AssignorVMResponse,
  AssignorViewModel,
} from '@infra/http/adapters/view-model';
import { ApiPath, ApiAssignorTag } from '../../constants';
import { EditAssignorUseCase } from '@core/assignor/usecases/edit-assignor';
import { EditAssignorDto } from '@infra/http/adapters/controllers/assignor/dtos';

@ApiBearerAuth()
@ApiTags(ApiAssignorTag)
@Controller(ApiPath)
export class EditAssignorController {
  constructor(private readonly editAssignorUseCase: EditAssignorUseCase) {}

  @ApiOperation({
    summary: 'Edit Assignor',
    description: 'Updates an existing assignor record with new details.',
  })
  @ApiBody({
    description: 'Properties to edit an assignor',
    type: EditAssignorDto,
    required: true,
  })
  @ApiOkResponse({
    description: 'The assignor has been successfully edited',
    type: AssignorVMResponse,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid input data',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the assignor to edit',
    type: String,
  })
  @Put('assignor/:id')
  public async editAssignor(
    @Param('id') id: string,
    @Body() dto: EditAssignorDto,
  ): Promise<AssignorVMResponse> {
    const { assignor } = await this.editAssignorUseCase.execute({
      id,
      ...dto,
    });

    return AssignorViewModel.toHTTP(assignor);
  }
}
