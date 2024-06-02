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
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ApiPath, ApiPayableTag } from '../../constants';
import { DeletePayableUseCase } from '@core/payable/usecases';

@ApiBearerAuth()
@ApiTags(ApiPayableTag)
@Controller(ApiPath)
export class DeletePayableController {
  constructor(private readonly deletePayableUseCase: DeletePayableUseCase) {}
  @ApiOperation({
    summary: 'Delete Payable',
    description: 'Deletes a payable record using the specified ID.',
  })
  @ApiNoContentResponse({
    description: 'The payable has been successfully deleted',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the payable to delete',
    type: String,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('payable/:id')
  public async deleteAssignor(@Param('id') id: string): Promise<void> {
    await this.deletePayableUseCase.execute(id);
  }
}
