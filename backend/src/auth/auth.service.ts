import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    const user = await this.userService.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async validateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return { valid: true };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
