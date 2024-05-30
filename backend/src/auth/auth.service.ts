import { Inject, Injectable } from '@nestjs/common';
import { Encrypter } from 'src/shared/adapters';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('Encrypter') private encrypter: Encrypter,
    private userService: UserService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userService.findOne(login);
    if (user && (await this.encrypter.compare(password, user.password))) {
      const { password: psw, ...result } = user;
      return result;
    }
    return null;
  }
}
