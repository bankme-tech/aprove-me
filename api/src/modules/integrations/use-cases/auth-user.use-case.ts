import { IUseCase } from '@/core/use-cases/interfaces';
import { AuthDto } from '../infra/http/dtos/auth.dto';
import { Injectable } from '@nestjs/common';
import { FindAssignorByEmailCase } from './find-assignor-by-email.use-case';
import * as bcrypt from 'bcrypt';
import { EmailOrPasswordIncorrectError } from './errors/email-or-password-incorrect.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthUserUseCase implements IUseCase {
  constructor(
    private findAssignorByEmailCase: FindAssignorByEmailCase,
    private jwtService: JwtService,
  ) {}

  public async execute(authDto: AuthDto) {
    const assignor = await this.findAssignorByEmailCase.execute(authDto.email);

    const isMatch = await bcrypt.compare(authDto.password, assignor.password);

    if (!isMatch) {
      throw new EmailOrPasswordIncorrectError();
    }

    const payload = { sub: assignor.id };
    return {
      assignor,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
