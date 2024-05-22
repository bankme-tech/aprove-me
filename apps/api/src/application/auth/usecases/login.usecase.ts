import { Injectable } from '@nestjs/common';

import { EnvService } from '@bankme/nestjs-env';
import { IToken } from '@bankme/domain';

import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

@Injectable()
export class LoginUseCase {
  constructor(private readonly _envService: EnvService) {}

  async login(currentUser: User): Promise<IToken> {
    const accessToken = jwt.sign(
      { id: currentUser.id, username: currentUser.username },
      this._envService.get('JWT_SECRET'),
      {
        expiresIn: this._envService.get('JWT_EXPIRES_IN'),
      },
    );
    return { accessToken };
  }
}
