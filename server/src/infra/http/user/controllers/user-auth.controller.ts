import { AuthenticateUserService } from '@modules/user/services/authenticate-user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticateUserDto } from '../dtos/authenticate-user.dto';
import { RefreshUserTokenService } from '@modules/user/services/refresh-user-token.service';
import { User } from '@modules/user/entities/user.entity';

@Controller('integrations/auth')
@ApiTags('User Auth')
export class UserAuthController {
  constructor(
    private authenticateUserService: AuthenticateUserService,
    private refreshUserTokenService: RefreshUserTokenService,
  ) {}

  @ApiBody({ schema: { example: { login: 'aprovame', password: 'aprovame' } } })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  async authenticate(@Body() body: AuthenticateUserDto) {
    return (await this.authenticateUserService.execute(body)).value;
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: User) {
    return (await this.refreshUserTokenService.execute(body)).value;
  }
}
