import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from '@prisma/client';
import { Public } from './decorators/public.decorator';

@Controller('integrations')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<{message:string}> {    
    const { login, password } = createUserDto;
    return this.usersService.create({ login, password });
  }

  @Public()
  @Post('auth')
  login(@Body() createUserDto: CreateUserDto): Promise<{access_token:string;}> {
    const { login, password } = createUserDto;
    return this.usersService.login({ login, password });
  }
}
