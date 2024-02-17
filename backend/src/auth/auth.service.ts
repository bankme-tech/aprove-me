import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByLogin(login);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.login, role: user.role.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}