import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.model';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() user: User) {
    return this.authService.signIn(user.username, user.password);
  }
}