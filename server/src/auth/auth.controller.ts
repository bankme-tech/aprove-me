import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { IsPublic } from './decorators/ispublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }
}
