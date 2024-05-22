import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class TokenService {
  readonly JWT_PRIVATE_KEY = 'my_random_jwt_key';
  readonly JWT_EXPIRES_IN = '1m';

  public verifyToken(token: string) {
    return jwt.verify(token, this.JWT_PRIVATE_KEY);
  }

  public async generateToken(payload: Partial<IUser>) {
    return jwt.sign(payload, this.JWT_PRIVATE_KEY, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }
}
