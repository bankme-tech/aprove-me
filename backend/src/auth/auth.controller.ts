import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { Public } from 'src/decorators/Public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async signIn(@Body() loginDto: LoginDTO) {
    return this.authService.signIn(loginDto);
  }

  @Public()
  @Post('validate-token')
  async validateToken(@Body() validateTokenDTO: { token: string }) {
    return this.authService.validateToken(validateTokenDTO.token);
  }
}
