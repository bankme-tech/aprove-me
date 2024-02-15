import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAdapterRepo } from 'src/repositories/jwt';
import { EnvService } from '../env/env.service';

@Injectable()
export class JwtEncrypter implements JwtAdapterRepo {
  constructor(
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.envService.get('JWT_SECRET_KEY'),
      expiresIn: this.envService.get('JWT_EXPIRATION_TIME'),
    });
  }
}
