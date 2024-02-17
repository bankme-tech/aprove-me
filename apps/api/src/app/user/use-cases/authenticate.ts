import { UserRepository } from '@/database/repositories/user.repository';
import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Either, left, right } from '@util/either';

export enum AuthenticateUseCaseError {
  INVALID_CREDENTIALS = 'invalid_credentials',
}

type AuthenticateUseCaseRequest = {
  username: string;
  password: string;
};

type AuthenticateUseCaseResponse = Either<
  AuthenticateUseCaseError,
  {
    token: string;
    user: User;
  }
>;

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    username,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    if (password.length < 8) {
      return left(AuthenticateUseCaseError.INVALID_CREDENTIALS);
    }

    const existsUser = await this.userRepository.findByUsername(username);

    if (!existsUser) {
      return left(AuthenticateUseCaseError.INVALID_CREDENTIALS);
    }

    const passwordMatch = await compare(password, existsUser.password);

    if (!passwordMatch) {
      return left(AuthenticateUseCaseError.INVALID_CREDENTIALS);
    }

    const payload = { id: existsUser.id };
    const token = this.jwtService.sign(payload);

    delete existsUser.password;

    return right({
      token,
      user: existsUser,
    });
  }
}
