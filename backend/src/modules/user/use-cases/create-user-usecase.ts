import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { User } from 'src/domain/entities';
import { BcryptAdapterRepository, UserRepository } from 'src/repositories';

type Input = {
  username: string;
  password: string;
};

type Output = {
  user: User;
};

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptAdapterRepository: BcryptAdapterRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.findByUsername(input.username);

    if (userExists) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }

    const hashpassword = await this.bcryptAdapterRepository.hash(
      input.password,
    );

    const user = await this.userRepository.create({
      password: hashpassword,
      username: input.username,
    });

    return {
      user,
    };
  }
}
