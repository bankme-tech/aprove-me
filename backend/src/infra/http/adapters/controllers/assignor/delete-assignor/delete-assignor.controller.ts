import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ApiPath, ApiAssignorTag } from '../../constants';
import { DeleteAssignorUseCase } from '@core/assignor/usecases/delete-assignor';

@ApiBearerAuth()
@ApiTags(ApiAssignorTag)
@Controller(ApiPath)
export class DeleteAssignorController {
  constructor(private readonly deleteAssignorUseCase: DeleteAssignorUseCase) {}

  @ApiOperation({
    summary: 'Delete Assignor',
    description: 'Deletes an assignor record using the specified ID.',
  })
  @ApiNoContentResponse({
    description: 'The assignor has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the assignor to delete',
    type: String,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('assignor/:id')
  public async deleteAssignor(@Param('id') id: string): Promise<void> {
    await this.deleteAssignorUseCase.execute({ id });
  }
}
