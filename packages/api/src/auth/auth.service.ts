import * as argon from 'argon2';
import { UserService } from '@user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string) {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload = { sub: user.id, login: user.login };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
