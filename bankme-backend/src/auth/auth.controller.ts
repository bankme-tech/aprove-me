import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  async signIn(@Body() dto: CredentialsDto) {
    return this.authService.signIn(dto)
  }
}
