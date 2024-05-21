import { Controller, Get } from '@nestjs/common';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  @IsPublic()
  @Get('/health')
  getHello(): string {
    return 'OK';
  }

  @Get('me')
  getMe(@CurrentUser() user: User): User {
    return user;
  }
}
