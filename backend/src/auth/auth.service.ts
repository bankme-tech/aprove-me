import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(signInDto: SignInDto) {
    if (signInDto.password !== 'aprovame' || signInDto.login !== 'aprovame') {
      throw new UnauthorizedException('Não autorizado');
    }

    const payload = { username: signInDto.login };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '1m',
      }),
    };
  }
}
