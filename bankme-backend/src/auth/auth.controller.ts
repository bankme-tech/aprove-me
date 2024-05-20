import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/utils/isPublic.decorator';

@ApiTags('auth')
@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Returns a JWT token if the credentials are valid
   */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('auth')
  async signIn(@Body() dto: CredentialsDto) {
    return this.authService.signIn(dto);
  }
}
