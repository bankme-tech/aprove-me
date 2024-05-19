import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@user/repositories/user-repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(login: string, password: string) {
    const user = await this.userRepository.findByLogin(login);

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
