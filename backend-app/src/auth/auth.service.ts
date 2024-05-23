import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**Camada de serviço da rota de autenticação. Responsável pelo processo de login do usuário.*/
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  /**Checa que o usuário existe no banco de dados e compara a senha encriptada. Se tudo estiver correto, retorna um novo token de autenticação. Se não, retorna um erro de "Usuário Inválido". */
  async login(loginAuthDto: LoginAuthDto) {
    try {
      const response = await this.prisma.user.findUnique({
        where: {
          login: loginAuthDto.login,
        },
      });
      if (
        response &&
        (await bcrypt.compare(loginAuthDto.password, response.password))
      ) {
        const newToken = this.jwtService.sign({
          id: response.id,
          user: response.login,
        });
        return newToken;
      }
    } catch (err) {
      throw new UnauthorizedException('Usuário inválido.');
    }
  }
}
