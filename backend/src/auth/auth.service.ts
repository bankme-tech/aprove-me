import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signIn(loginDTO: LoginDTO) {
    const { login, password } = loginDTO;
    const user = await this.userService.findByLogin(login);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, login: user.login };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
