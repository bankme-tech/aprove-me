import { UserDto } from '../DTOs/user';
import { UserRepo } from '../repositories/user-repo';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateToken } from './toke';

@Injectable()
export class AuthService {
  constructor(
    private user: UserRepo,
    private jwt: CreateToken,
  ) {}

  async authenticate(body: UserDto): Promise<{ token: string }> {
    try {
      const { login, password } = body;
      const user = await this.user.getUserByLogin(login);
      if (user) {
        const unHashedPassword = await bcrypt.compare(password, user.password);

        if (unHashedPassword) {
          const token = await this.jwt.generate(user.login, user.id);
          return { token };
        }
        throw new BadRequestException('Senha incorreta');
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
