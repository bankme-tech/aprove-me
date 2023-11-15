import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    if (username !== 'aprovame' || pass !== 'aprovame') {
      throw new UnauthorizedException();
    }

    const payload = { username, sub: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
