import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { IOption } from '@bankme/monads';

import { User } from '@bankme/domain';

import { CreateUserUseCase } from '@application/user/usecases/create-user.usecase';
import { CurrentUser } from '@application/auth/decorators/current-user.decorator';
import { FindOneUserUseCase } from '@application/user/usecases/find-one-user.usecase';
import { UserByIdPipe } from '@application/user/pipes/user-by-id.pipe';
import { FindMeUseCase } from '@application/user/usecases/find-me-usecase';
import { SkipJwt } from '@application/auth/decorators/skip-jwt.decorator';

import { UserPresenter } from '@presentation/user/presenters/user.presenter';
import { CreateUserDto } from '@presentation/user/dtos/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _findOneUserUseCase: FindOneUserUseCase,
    private readonly _findMeUseCase: FindMeUseCase,
  ) {}

  @ApiOperation({ summary: 'Creates a single new user' })
  @ApiCreatedResponse({ type: UserPresenter })
  @SkipJwt()
  @Post()
  async signUp(@Body() dto: CreateUserDto): Promise<UserPresenter> {
    const user = await this._createUserUseCase.create(dto);
    return new UserPresenter(user);
  }

  @ApiOperation({ summary: 'Retrieves a single user given its token' })
  @ApiOkResponse({ type: UserPresenter })
  @Get('me')
  async findMe(
    @CurrentUser() currentUser: IOption<User>,
  ): Promise<UserPresenter> {
    const result = await this._findMeUseCase.find(currentUser);
    return new UserPresenter(result);
  }

  @ApiOperation({ summary: 'Retrieves a single user given its id' })
  @ApiOkResponse({ type: UserPresenter })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async findOneById(
    @CurrentUser() currentUser: IOption<User>,
    @Param('id', UserByIdPipe) user: User,
  ): Promise<UserPresenter> {
    const result = await this._findOneUserUseCase.find(currentUser, user);
    return new UserPresenter(result);
  }
}
