import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.login);

    return user;
  }

  async decodeToken(token: string): Promise<{ login: string; id: number }> {
    const decoded = (await this.jwtService.decode(token)) || {
      login: null,
      id: null,
    };

    if (decoded.login && decoded.id) {
      const { login, id } = decoded;
      return { login, id };
    }

    return null;
  }
}
