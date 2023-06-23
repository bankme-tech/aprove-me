import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

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
    const validLogin = 'aprovame';
    const validPassword = 'aprovame';

    return login === validLogin && password === validPassword;
  }
}
