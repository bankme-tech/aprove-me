import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AssignorService } from '../assignor/assignor.service';

@Injectable()
export class AuthService {
  private assignorService: AssignorService;
  private jwtService: JwtService;

  constructor(assignorService: AssignorService, jwtService: JwtService) {
    this.assignorService = assignorService;
    this.jwtService = jwtService;
  }

  async login(email: string, password: string) {
    const user = await this.assignorService.findAssignorByEmail(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.email, username: user.name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
