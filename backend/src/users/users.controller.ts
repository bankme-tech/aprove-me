import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from './entities/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserJWT } from '../auth/entities/userJTW.entity';
import { SafeUserDto } from './dto/safe-user.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<SafeUserDto> {
    return this.usersService.create(createUserDto);
  }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':username')
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    const user = req.user as UserJWT;

    if (user.username !== 'aprovame' && username === 'aprovame') {
      throw new ForbiddenException('You cannot update the aprovame user');
    }

    return this.usersService.update(username, updateUserDto);
  }

  @Delete(':username')
  async remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const userFound = await this.usersService.findByUsername(username);

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }
}
