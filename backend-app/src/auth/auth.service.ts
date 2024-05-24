import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthServiceResponse } from '../types';

/**Camada de serviço da rota de autenticação. Responsável pelo processo de login do usuário.*/
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**Checa que o usuário existe no banco de dados e compara a senha encriptada. Se tudo estiver correto, retorna um novo token de autenticação. Se não, retorna um erro de "Usuário Inválido". */
  async login(loginAuthDto: LoginAuthDto): Promise<AuthServiceResponse> {
    const { login, password } = loginAuthDto;
    const user = await this.prisma.user.findUnique({
      where: { login },
    });
    // Caso, o usuário não exista no banco de dados, retorna mensagem de erro.
    if (!user) {
      return {
        status: 400,
        body: { message: 'Usuário não encontrado.' },
      };
    }
    // Caso o usuário exista, compara a senha submetida com a hash salva no banco. Se correto, retorna mensagem de sucesso e o novo token gerado.
    if (bcrypt.compareSync(password, user.password)) {
      const newToken = this.jwtService.sign({
        userId: user.id,
        username: login,
      });
      return {
        status: 200,
        body: {
          message: 'Login efetuado com sucesso.',
          token: newToken,
        },
      };
    }
  }
}
