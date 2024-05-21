import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Assignor } from '@domain/assignor/models/assignor';

import { FindOneAssignorUseCase } from '@application/assignor/usecases/find-one-payable-by-id.usecase';
import { AssignorByIdPipe } from '@application/assignor/pipes/assignor-by-id.pipe';

import { AssignorPresenter } from '@presentation/assignor/presenters/assignor.presenter';

@ApiTags('integrations/assignor')
@Controller('integrations/assignor')
export class AssignorController {
  constructor(
    private readonly _findOneAssignorUseCase: FindOneAssignorUseCase,
  ) {}

  @ApiOperation({ summary: 'Retrieves a single payable given its id' })
  @ApiOkResponse({ type: AssignorPresenter })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async find(
    @Param('id', AssignorByIdPipe) assignor: Assignor,
  ): Promise<AssignorPresenter> {
    const result = await this._findOneAssignorUseCase.find(assignor);
    return new AssignorPresenter(result);
  }
}
