import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { IUsersService } from '../users/interface/users-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(UsersService) private usersService: IUsersService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username, sub: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
