import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto, AuthResponseDto } from './dto';
import { ApiAuthTag, ApiPath } from '../constants';
import { AuthenticateUseCase } from '@core/auth/usecases';
import { IsPublic } from '@infra/auth/decorators';

@IsPublic()
@ApiTags(ApiAuthTag)
@Controller(ApiPath)
export class AuthController {
  constructor(private readonly authenticateUserUseCase: AuthenticateUseCase) {}

  @ApiOperation({
    summary: 'Authenticate access',
    description: 'Authenticate access with provided credentials',
  })
  @ApiBody({
    type: AuthDto,
    description: 'Access Credentials',
    required: true,
  })
  @ApiOkResponse({
    description: 'Return access token',
    type: AuthResponseDto,
  })
  @Post('auth')
  public async authenticateUser(
    @Body() authDto: AuthDto,
  ): Promise<AuthResponseDto> {
    return await this.authenticateUserUseCase.execute(authDto);
  }
}
