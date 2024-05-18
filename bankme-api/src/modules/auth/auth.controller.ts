import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('/integrations/auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  async login(@Body(new ValidationPipe()) user: LoginDto) {
    return this.service.login(user);
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) user: LoginDto) {
    return this.service.register(user);
  }
}
