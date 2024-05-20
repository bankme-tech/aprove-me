import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(login: string) {
    return this.jwtService.sign({ login });
  }

  async validateToken(token: string) {
    try {
        return this.jwtService.verify(token.replace("Bearer ", ""));
    } catch (error) {
        return false;
    }
  }
}
