import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Public } from '../decorators/public.decorator';

@Controller('integrations/auth')
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authSerivce.signIn(signInDto.login, signInDto.password);
  }
}
