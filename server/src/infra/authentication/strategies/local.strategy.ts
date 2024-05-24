import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateUserService } from '@modules/user/services/authenticate-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticateService: AuthenticateUserService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.authenticateService.execute({ login, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
