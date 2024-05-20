import { User } from '@/app/entities/user';
import { UserAlreadyExists } from '@/app/errors/user-already-exists';
import { BcryptAdapterRepository } from '@/app/repositories/bcrypt-adapter-repository';
import { UserRepository } from '@/app/repositories/user.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  login: string;
  password: string;
}

interface Output {
  user: User;
}

@Injectable()
export class AddNewUser {
  constructor(
    private userRepository: UserRepository,
    private bcryptAdapter: BcryptAdapterRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const salt = await this.bcryptAdapter.genSalt();
    const hashPassword = await this.bcryptAdapter.hash(input.password, salt);

    const findUser = await this.userRepository.findByLogin(input.login);

    if (findUser) throw new UserAlreadyExists();

    const user = new User({
      login: input.login,
      password: hashPassword,
    });

    await this.userRepository.create(user);

    return { user };
  }
}
