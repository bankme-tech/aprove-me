import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AssignorRepository } from '../../../data/repositories/assignor-repository/assignor-repository';

interface Payload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly assignorRepository: AssignorRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true, // TODO - toggle to false
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload) {
    const user = await this.assignorRepository.findOne({
      where: {
        email: payload.email,
        deletedAt: null
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token')
    }

    return user;
  }
}
