import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginUseCase } from '@application/auth/usecases/login.usecase';
import { SkipJwt } from '@application/auth/decorators/skip-jwt.decorator';
import { LocalGuard } from '@application/auth/guards/local.guard';
import { CurrentUser } from '@application/auth/decorators/current-user.decorator';

import { TokenPresenter } from '@presentation/auth/presenters/token.presenter';
import { LoginDto } from '@presentation/auth/dtos/login.dto';

import { User } from '@prisma/client';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _loginUseCase: LoginUseCase) {}

  @ApiOperation({ summary: 'Logs in the user' })
  @ApiOkResponse({ type: TokenPresenter })
  @SkipJwt()
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('login')
  async login(
    @CurrentUser() currentUser: User,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _dto: LoginDto,
  ): Promise<TokenPresenter> {
    const token = await this._loginUseCase.login(currentUser);
    return new TokenPresenter(token);
  }
}
