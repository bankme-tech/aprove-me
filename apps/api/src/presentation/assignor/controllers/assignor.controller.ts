import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { Assignor } from '@bankme/domain';

import { AssignorByIdPipe } from '@application/assignor/pipes/assignor-by-id.pipe';
import { FindOneAssignorUseCase } from '@application/assignor/usecases/find-one-assignor.usecase';
import { UpdateOneAssignorUseCase } from '@application/assignor/usecases/update-one-assignor.usecase';

import { AssignorPresenter } from '@presentation/assignor/presenters/assignor.presenter';
import { UpdateAssignorDto } from '@presentation/assignor/dtos/update-assignor.dto';

@ApiTags('integrations/assignor')
@Controller('integrations/assignor')
export class AssignorController {
  constructor(
    private readonly _findOneAssignorUseCase: FindOneAssignorUseCase,
    private readonly _updateOneAssignorUseCase: UpdateOneAssignorUseCase,
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

  @ApiOperation({ summary: 'Updates a single payable given its id' })
  @ApiOkResponse({ type: AssignorPresenter })
  @ApiParam({ name: 'id', type: String })
  @Patch(':id')
  async update(
    @Body() dto: UpdateAssignorDto,
    @Param('id', AssignorByIdPipe) assignor: Assignor,
  ): Promise<AssignorPresenter> {
    const result = await this._updateOneAssignorUseCase.update(dto, assignor);
    return new AssignorPresenter(result);
  }
}
