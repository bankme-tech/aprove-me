
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/user.service';

import * as dotenv from 'dotenv';
import { jwtSecret } from './auth.module';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:jwtSecret,
    });
  }

  async validate(payload: { userId: string}) {
  
    const user = await this.usersService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}