import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      login: 'aprovame',
      password: 'aprovame'
    }
  ]

  constructor(private readonly jwtService: JwtService) {}

  async login(login: string, password: string) {
    const payload = { login: login, password: password }

    const user = this.users.find(user => user.login === login && user.password === password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}