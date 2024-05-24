import { UserDto } from '../DTOs/user';
import { UserRepo } from '../repositories/user-repo';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private user: UserRepo,
    private jwt: JwtService,
  ) {}

  async authenticate(body: UserDto): Promise<{ token: string }> {
    try {
      const { login, password } = body;
      const user = await this.user.getUserByLogin(login);
      if (user) {
        const unHashedPassword = await bcrypt.compare(password, user.password);
        console.log(unHashedPassword);
        if (unHashedPassword) {
          const token = this.jwt.sign({ username: user.login, sub: user.id });
          console.log(token);
          return { token };
        }
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
