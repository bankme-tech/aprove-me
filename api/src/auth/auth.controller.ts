import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/integrations/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
}
