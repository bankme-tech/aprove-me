import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IUnsafeUser } from './interfaces/user.interface';

@Injectable()
export class CryptoService {
  private SALT_ROUNDS = 10;
  public async hash(unhashedPassword: string, salt: string): Promise<string> {
    return bcrypt.hash(unhashedPassword, salt);
  }

  public async genSalt(saltRounds = this.SALT_ROUNDS): Promise<string> {
    return bcrypt.genSalt(saltRounds);
  }

  public async compareUserPasswords(
    unhashedPassword: string,
    user: Pick<IUnsafeUser, 'salt' | 'password'>,
  ): Promise<boolean> {
    if (!user.password || !user.salt) {
      throw new InternalServerErrorException('Auth error');
    }
    const password = await this.hash(unhashedPassword, user.salt);
    return password === user.password;
  }
}
