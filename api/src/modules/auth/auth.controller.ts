import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';

@Controller('integrations/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  signIn(@Body() { username, password }: SignInDTO) {
    return this.authService.signIn(username, password);
  }
}
