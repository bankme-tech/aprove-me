import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async signIn(login: string, password: string): Promise<{ access_token: string }> {
    const payload = { id: 'id', login };

    if (login == "aprovame" && password == "aprovame") {
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    else {
      throw new UnauthorizedException();
    }

  }
}
