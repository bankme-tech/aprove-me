import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './application/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  async login(@Body() body) {
    // Em um cenário real esta validação viria da base de dados. Mas para este cenário será simples assim.
    if (body.login === 'aprovame' && body.password === 'aprovame') {
      const token = await this.authService.createToken(body.login);
      return {
        auth: true,
        token: token,
      }
    }
    throw new UnauthorizedException();
  }
}
