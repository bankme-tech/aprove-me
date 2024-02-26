import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserBodyDTO } from './dtos/CreateUserDTO';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import {
  UserOkResponse,
  UserUnauthorizedResponse,
} from './swagger/users.swagger';
import { FindOneUserParamDTO } from './dtos/FindOneUserDTO';
import { UpdateUserBodyDTO, UpdateUserParamDTO } from './dtos/UpdateUserDTO';
import { FindUserQueryDTO } from './dtos/FindAllUsersDTO';
import { DeleteUserParamDTO } from './dtos/DeleteUserDTO';
import { SendMailProducerService } from './jobs/sendMail.producer';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly sendEmailService: SendMailProducerService,
  ) { }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  create(@Body() body: CreateUserBodyDTO): Promise<UserEntity> {
    this.sendEmailService.sendMail(body);
    const { name, email, password } = body;
    return this.usersService.create({ name, email, password });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  findByEmail(@Query() query: FindUserQueryDTO): Promise<UserEntity[]> {
    const { email, name } = query;
    return this.usersService.findAll({ email, name });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  findById(@Param() param: FindOneUserParamDTO): Promise<UserEntity | null> {
    const { id } = param;
    return this.usersService.findOne({ id: Number(id) });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOkResponse })
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  update(
    @Param() param: UpdateUserParamDTO,
    @Body() body: UpdateUserBodyDTO,
  ): Promise<UserEntity> {
    const { id } = param;
    const { name, email } = body;
    return this.usersService.update({ id: Number(id), name, email });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UserUnauthorizedResponse })
  delete(@Param() param: DeleteUserParamDTO): Promise<void> {
    const { id } = param;
    return this.usersService.delete({ id: Number(id) });
  }
}
