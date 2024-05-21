import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/authenticate-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    return {
      token: await this.jwtService.signAsync({}),
    };
  }
}
