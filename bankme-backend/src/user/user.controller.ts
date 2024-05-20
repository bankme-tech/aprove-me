import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Public } from 'src/utils/isPublic.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('integrations')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create new User
   */
  @Public()
  @Post('auth/register')
  async register(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
