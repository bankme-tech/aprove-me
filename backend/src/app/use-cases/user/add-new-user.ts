import { User } from '@/app/entities/user';
import { UserAlreadyExists } from '@/app/errors/user-already-exists';
import { UserRepository } from '@/app/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface Input {
  login: string;
  password: string;
}

interface Output {
  user: User;
}

@Injectable()
export class AddNewUser {
  constructor(private userRepository: UserRepository) {}

  async execute(input: Input): Promise<Output> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(input.password, salt);

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
