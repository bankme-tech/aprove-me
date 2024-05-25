import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateToken {
  constructor(private jwt: JwtService) {}

  async generate(user: string, sub: number) {
    return this.jwt.signAsync({ username: user, sub: sub });
  }
}
