import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('integrations')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<{access_token:string}> {    
    const { login, password } = createUserDto;
    const user = await this.usersService.create({ login, password });
    return this.usersService.login(user);
  }

  @Public()
  @Post('auth')
  login(@Body() createUserDto: CreateUserDto): Promise<{access_token:string;}> {
    const { login, password } = createUserDto;
    return this.usersService.login({ login, password });
  }
}
