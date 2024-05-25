import { Injectable } from '@nestjs/common';
import { AuthInputDTO } from './dto/auth.input.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthOutputDTO } from './dto/auth.output.dto';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {
  private readonly validCredentials = {
    login: 'aprovame',
    password: 'aprovame',
  };

  constructor(private readonly jwtService: JwtService) {}

  async authenticate(authDTO: AuthInputDTO): Promise<AuthOutputDTO> {
    if (
      authDTO.login !== this.validCredentials.login ||
      authDTO.password !== this.validCredentials.password
    ) {
      throw new UnauthorizedError();
    }

    const token = await this.jwtService.signAsync({
      login: authDTO.login,
      password: authDTO.password,
    });

    return {
      token,
    };
  }
}
