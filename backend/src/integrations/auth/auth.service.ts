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
    const user = await this.usersService.findOne(login);
    if (user?.password !== pass) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Não autorizado',
      });
    }
    const payload = { sub: user.userId, login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
