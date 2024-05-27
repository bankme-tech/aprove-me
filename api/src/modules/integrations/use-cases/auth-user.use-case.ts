import { IUseCase } from '@/core/use-cases/interfaces';
import { AuthDto } from '../infra/http/dtos/auth.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../domain/repositories/users.repository';
import { LoginOrPasswordIncorrectError } from './errors/login-or-password-incorrect.error';

@Injectable()
export class AuthUserUseCase implements IUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async execute(authDto: AuthDto) {
    const user = await this.usersRepository.findByLogin(authDto.login);

    if (!user) {
      throw new LoginOrPasswordIncorrectError();
    }

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) {
      throw new LoginOrPasswordIncorrectError();
    }

    const payload = { sub: user.id };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
