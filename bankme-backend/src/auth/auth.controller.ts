import { Body, Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/isPublic.decorator';

@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('auth')
  async signIn(@Body() dto: CredentialsDto) {
    return this.authService.signIn(dto)
  }
}
