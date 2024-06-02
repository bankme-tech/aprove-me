import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterPermissionDto } from './dto';
import { IsPublic } from '@infra/auth/decorators';
import { ApiPath, ApiPermissionTag } from '../constants';
import { RegisterPermissionUseCase } from '@core/auth/usecases';

@IsPublic()
@ApiTags(ApiPermissionTag)
@Controller(ApiPath)
export class RegisterPermissionController {
  constructor(
    private readonly registerPermissionUseCase: RegisterPermissionUseCase,
  ) {}

  @ApiOperation({
    summary: 'Permission Registration',
    description:
      'This endpoint allows for the registration of a new permission in the application using the provided credentials.',
  })
  @ApiBody({
    type: RegisterPermissionDto,
    description: 'permission credentials including login and password.',
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('permissions')
  public async registerPermission(
    @Body() dto: RegisterPermissionDto,
  ): Promise<void> {
    return await this.registerPermissionUseCase.execute(dto);
  }
}
