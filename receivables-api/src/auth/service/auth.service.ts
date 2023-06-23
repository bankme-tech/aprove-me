import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private prisma: PrismaClient;

  constructor(private readonly jwtService: JwtService) {
    this.prisma = new PrismaClient();
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { login, password } = authCredentialsDto;

    // Verificar se as credenciais são válidas
    const isValidCredentials = await this.validateCredentials(login, password);

    if (!isValidCredentials) {
      return null;
    }

    // Gerar token JWT com tempo de expiração de 1 minuto
    const token = this.jwtService.sign({ login }, { expiresIn: '1m' });
    return token;
  }

  private async validateCredentials(
    login: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: { login, senha: password },
    });

    return !!user; // Retorna true se o usuário for encontrado, caso contrário, retorna false
  }
}
