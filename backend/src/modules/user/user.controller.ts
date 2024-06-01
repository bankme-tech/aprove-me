import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import {
  UserNoBaseModel,
  UserNoBaseModelDto,
} from './dto/user-no-base-model.dto';
import { UserInterceptor } from './user.interceptors';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
@ApiBearerAuth()
@UseInterceptors(UserInterceptor)
export class UserController extends CrudStrategyController<
  User,
  UserNoBaseModel,
  UserNoBaseModel
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiBody({ type: UserNoBaseModelDto })
  @HttpCode(201)
  async create(@Body() createDto: UserNoBaseModel): Promise<User> {
    return await this.userService.create({
      ...createDto,
      password: await bcrypt.hash(createDto.password, await bcrypt.genSalt()),
    });
  }

  @Patch(':id')
  @ApiBody({ type: UserNoBaseModelDto })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UserNoBaseModel,
  ): Promise<User> {
    return await this.userService.update(id, updateDto);
  }
}
