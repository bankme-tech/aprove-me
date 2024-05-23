import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login-dto';


@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
    @Post('/auth')
    login(@Body() { email, password }: LoginDto) {
      return this.authService.login(email, password);
    }
}