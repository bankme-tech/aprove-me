import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignInOutput } from 'src/dtos/signin.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: SignInDto): Promise<SignInOutput> {
    const user = await this.usersService.findByUsername(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const { id, username: name } = user;

    const payload = { sub: id, username: name };

    return {
      username: name,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
