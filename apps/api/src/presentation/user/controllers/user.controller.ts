import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserUseCase } from '@application/user/usecases/create-user.usecase';

import { UserPresenter } from '@presentation/user/presenters/user.presenter';
import { CreateUserDto } from '@presentation/user/dtos/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly _createUserUseCase: CreateUserUseCase) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @ApiCreatedResponse({ type: UserPresenter })
  @Post()
  async signUp(@Body() dto: CreateUserDto): Promise<UserPresenter> {
    const user = await this._createUserUseCase.create(dto);
    return new UserPresenter(user);
  }
}
