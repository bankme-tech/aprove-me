import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthInputDTO } from './dto/auth.input.dto';
import { AuthService } from './auth.service';
import { AuthOutputDTO } from './dto/auth.output.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async authenticate(@Body() authDTO: AuthInputDTO): Promise<AuthOutputDTO> {
    return await this.authService.authenticate(authDTO);
  }
}
