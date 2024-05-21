import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags, OmitType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CrudStrategyController } from '../crud-strategy/crud-strategy.controller';
import { UserDto } from './dto/user.dto';
import { UserInterceptor } from './user.interceptors';
import { UserService } from './user.service';

@ApiTags('User')
@Controller({ path: 'user', version: '1' })
@UseInterceptors(UserInterceptor)
export class UserController extends CrudStrategyController<
  User,
  Omit<UserDto, 'id'>,
  Omit<UserDto, 'id'>
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Post()
  @ApiBody({ type: OmitType(UserDto, ['id']) })
  @HttpCode(201)
  async create(@Body() createDto: Omit<UserDto, 'id'>): Promise<User> {
    return await this.userService.create({
      ...createDto,
      password: await bcrypt.hash(createDto.password, await bcrypt.genSalt()),
    });
  }

  @Patch(':id')
  @ApiBody({ type: OmitType(UserDto, ['id']) })
  async update(
    @Param('id') id: string,
    @Body() updateDto: Omit<UserDto, 'id'>,
  ): Promise<User> {
    return await this.userService.update(id, updateDto);
  }
}
