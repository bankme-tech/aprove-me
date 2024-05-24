import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<AuthEntity> {
    const user = await this.usersService.findByLogin(login);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Não autorizado',
      });
    }
    const payload = { sub: user.id, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
