import { UserDto } from '../DTOs/user';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateToken } from './toke';
import { UserService } from '../repositories/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private user: UserService,
    private jwt: CreateToken,
  ) {}

  async authenticate(body: UserDto): Promise<{ token: string }> {
    try {
      const { login, password } = body;
      const toLowerCaseLogin = login.toLowerCase();
      const user = await this.user.getUserByLogin(toLowerCaseLogin);

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

  async validateUser(login: string): Promise<{ login: string; id: number }> {
    const user = await this.user.getUserByLogin(login);
    if (user && user.login === login) {
      const { login, id } = user;

      return { login, id };
    }
    return null;
  }
}
