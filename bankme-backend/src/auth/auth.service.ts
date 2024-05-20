import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CredentialsDto } from './dto/auth.dto';
import { CryptoService } from 'src/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: CredentialsDto) {
    const { login, password } = dto;
    const user = await this.userService.findByLogin(login);

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const passwordIsValid = await this.cryptoService.compare(
      password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload = { sub: user.id, login: user.login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
