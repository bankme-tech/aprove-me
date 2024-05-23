import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';

/**Camada de Controle de autenticação responsável por receber os dados do login e inserir o token no header. */
@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const newToken = this.authService.login(loginAuthDto);
    return response
      .status(200)
      .json({ message: 'Login efetuado com sucesso.' })
      .header('authorization', `Bearer ${newToken}`);
  }
}
