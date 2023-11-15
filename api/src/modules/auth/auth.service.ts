import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    console.log('AAAAAAAAAAAAAAAaaa', user.password);

    const payload = { username, sub: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
