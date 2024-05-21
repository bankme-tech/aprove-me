import { UserNotFound } from '@/app/errors/user-not-found';
import { BcryptAdapterRepository } from '@/app/repositories/bcrypt-adapter-repository';
import { JwtAdapterRepository } from '@/app/repositories/jwt-adapter.repository';
import { UserRepository } from '@/app/repositories/user.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  login: string;
  password: string;
}

interface Output {
  acessToken: string;
  accessToken: string;
}

@Injectable()
export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private bcryptAdapter: BcryptAdapterRepository,
    private jwtAdapterRepository: JwtAdapterRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const findUser = await this.userRepository.findByLogin(input.login);

    if (!findUser) throw new UserNotFound();

    const comparePasswords = await this.bcryptAdapter.compare(
      input.password,
      findUser.props.password,
    );

    if (!comparePasswords) throw new UserNotFound();

    const token = {
      sub: findUser._id,
      login: findUser.props.login,
    };

    const acessToken = await this.jwtAdapterRepository.signAsync(token);
    const accessToken = await this.jwtAdapterRepository.signAsync(token);

    return { acessToken };
    return { accessToken };
  }
}
