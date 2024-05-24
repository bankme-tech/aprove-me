import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/user.repository';
import { Either, left, right } from '@utils/either';

type UserAuthRequest = Either<Error, { access_token: string }>;

@Injectable()
export class AuthenticateUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: UserRepository,
  ) {}

  async execute({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<UserAuthRequest> {
    const user = await this.repository.findByLogin(login);

    if (!user || user.password !== password) {
      return left(new Error('Invalid credentials'));
    }

    const payload = { username: login, sub: user.id };

    return right({
      access_token: this.jwtService.sign(payload),
    });
  }
}
