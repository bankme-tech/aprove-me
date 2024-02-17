import { hash } from 'bcrypt';
import { UserRepository } from '@/database/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Either, left, right } from '@util/either';
import { randomUUID } from 'crypto';

export enum CreateUserUseCaseError {
  USERNAME_ALREADY_IN_USE = 'username_already_in_use',
  PASSWORD_TOO_SMALL = 'password_too_small',
}

type CreateUserUseCaseRequest = {
  username: string;
  password: string;
};

type CreateUserUseCaseResponse = Either<
  CreateUserUseCaseError,
  {
    user: User;
  }
>;

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    if (password.length < 8) {
      return left(CreateUserUseCaseError.PASSWORD_TOO_SMALL);
    }

    const existsUserWithSameUsername =
      await this.userRepository.findByUsername(username);

    if (existsUserWithSameUsername) {
      return left(CreateUserUseCaseError.USERNAME_ALREADY_IN_USE);
    }

    const passwordSalts = 12;

    const createdUser = await this.userRepository.create({
      id: randomUUID(),
      username,
      password: await hash(password, passwordSalts),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    delete createdUser.password;

    return right({
      user: createdUser,
    });
  }
}
