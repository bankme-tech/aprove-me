import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthLoginDto from './dto/AuthLoginDto';

@Controller('auth')
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    const token = await this.authService.login(body.email, body.password);
    return token;
  }
}
