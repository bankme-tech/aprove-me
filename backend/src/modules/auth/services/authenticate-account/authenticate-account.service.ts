import { Injectable } from '@nestjs/common';
import { HashProvider } from '~/common/providers/hash.provider';
import { Either, left, right } from '~/common/utils/either';
import { IAccountRepository } from '../../repositories/interfaces/account.repository-interface';
import { InvalidCredentials } from '~/common/exceptions/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

interface RequestDate {
  login: string;
  password: string;
}

type ResponseData = Either<Error, { accessToken: string }>;

@Injectable()
export class AuthenticateAccountService {
  constructor(
    private repository: IAccountRepository,
    private hasher: HashProvider,
    private jwt: JwtService,
  ) {}

  async execute({ login, password }: RequestDate): Promise<ResponseData> {
    const account = await this.repository.findByLogin(login);

    if (!account) return left(new NotFoundResource('Login invalid.'));

    const passwordsMatch = await this.hasher.compare(
      password,
      account.password,
    );

    if (!passwordsMatch)
      return left(new InvalidCredentials('Password invalid.'));

    const payload = { sub: account.id, login: account.login };

    const accessToken = this.jwt.sign(payload);

    return right({ accessToken });
  }
}
