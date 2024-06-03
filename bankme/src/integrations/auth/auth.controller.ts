import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import AuthLoginDto from '../dto/AuthLoginDto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Login successful. Returns a token.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid credentials.',
  })
  @ApiBody({
    type: AuthLoginDto,
    description: 'Json structure for user object',
  })
  async login(@Body() body: AuthLoginDto) {
    const token = await this.authService.login(body.email, body.password);
    return token;
  }
}
