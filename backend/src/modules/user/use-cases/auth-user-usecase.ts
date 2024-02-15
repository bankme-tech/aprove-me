import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { BcryptAdapterRepository, UserRepository } from 'src/repositories';
import { JwtAdapterRepo } from 'src/repositories/jwt';

type Input = {
  username: string;
  password: string;
};

type Output = {
  token: string;
};

@Injectable()
export class AuthUserUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptAdapterRepository: BcryptAdapterRepository,
    private readonly jwtAdapterRepository: JwtAdapterRepo,
  ) {}

  async execute(input: Input): Promise<Output> {
    const userExists = await this.userRepository.findByUsername(input.username);

    if (!userExists) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    const comparePassword = await this.bcryptAdapterRepository.compare(
      input.password,
      userExists.password,
    );

    if (!comparePassword) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtAdapterRepository.encrypt({
      userId: userExists.id,
    });

    return {
      token,
    };
  }
}
