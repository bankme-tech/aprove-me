import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CreateToken {
  constructor(private jwt: JwtService) {}

  async generate(login: string, id: number) {
    const token = await this.jwt.signAsync({ login, id });
    return token;
  }
}
