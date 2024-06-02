import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  AssignorVMResponse,
  AssignorViewModel,
} from '@infra/http/adapters/view-model/assignor';
import { ApiPath, ApiAssignorTag } from '../../constants';
import { RegisterAssignorUseCase } from '@core/assignor/usecases';
import { RegisterAssignorDto } from '@infra/http/adapters/controllers/assignor/dtos';

@ApiBearerAuth()
@ApiTags(ApiAssignorTag)
@Controller(ApiPath)
export class RegisterAssignorController {
  constructor(
    private readonly registerAssignorUseCase: RegisterAssignorUseCase,
  ) {}

  @ApiOperation({
    summary: 'Register Assignor',
    description: 'Creates a new assignor record in the system.',
  })
  @ApiBody({
    description: 'Properties to register a assignor',
    type: RegisterAssignorDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'A assignor has been successfully registered',
    type: AssignorVMResponse,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Invalid input data',
  })
  @Post('assignor')
  public async registerAssignor(
    @Body() dto: RegisterAssignorDto,
  ): Promise<AssignorVMResponse> {
    const assignor = await this.registerAssignorUseCase.execute(dto);

    return AssignorViewModel.toHTTP(assignor);
  }
}
