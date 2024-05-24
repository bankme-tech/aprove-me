import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findByLogin(@Param('login') login: string) {
    return new UserEntity(await this.userService.findByLogin(login));
  }
}
