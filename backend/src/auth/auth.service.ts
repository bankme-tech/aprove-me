import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Encrypter } from 'src/shared/adapters';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Encrypter') private encrypter: Encrypter,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOne(login);
    if (user && (await this.encrypter.compare(password, user.password))) {
      const { password: psw, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
