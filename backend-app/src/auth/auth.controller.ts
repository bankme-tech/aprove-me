import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
import { AuthServiceResponse } from '../types';

/**Camada de Controle de autenticação responsável por receber os dados do login e inserir o token no header. */
@Controller('integrations')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**Método responsável pelo processo de login. */
  @Post('auth')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const result: AuthServiceResponse =
      await this.authService.login(loginAuthDto);
    // Se a propriedade "newToken" existe, o login foi bem sucedido.
    // Caso contrário, o usuário recebe a mensagem de erro definida na camada de serviço.
    if (result.newToken) {
      return response
        .header('authorization', `Bearer ${result.newToken}`)
        .status(result.status)
        .json(result.body);
    } else {
      return response.status(result.status).json(result.body);
    }
  }
}
