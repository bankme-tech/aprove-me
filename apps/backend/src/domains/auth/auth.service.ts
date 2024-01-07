import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async signIn(login: string, password: string) {
    return login === 'aprovame' && password === 'aprovame';
  }

  token(payload: Record<string, unknown>) {
    return this.jwt.signAsync(payload, { secret: process.env.API_TOKEN });
  }
}
