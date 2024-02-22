import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(data: LoginDto) {
    const { login, password } = data;
    const payload = { login, password };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
