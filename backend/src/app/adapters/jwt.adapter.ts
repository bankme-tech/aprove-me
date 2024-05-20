import { Injectable } from '@nestjs/common';
import { JwtAdapterRepository } from '@/app/repositories/jwt-adapter.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAdapter implements JwtAdapterRepository {
  constructor(private jwtService: JwtService) {}

  signAsync(token: Record<string, string>): Promise<string> {
    return this.jwtService.signAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  }
}
