import { IUseCase } from '@/core/use-cases/interfaces';
import { AuthDto } from '../infra/http/dtos/auth.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmailOrPasswordIncorrectError } from './errors/email-or-password-incorrect.error';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../domain/repositories/users.repository';

@Injectable()
export class AuthUserUseCase implements IUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  public async execute(authDto: AuthDto) {
    const user = await this.usersRepository.findByLogin(authDto.login);

    if (!user) {
      throw new EmailOrPasswordIncorrectError();
    }

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) {
      throw new EmailOrPasswordIncorrectError();
    }

    const payload = { sub: user.id };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
