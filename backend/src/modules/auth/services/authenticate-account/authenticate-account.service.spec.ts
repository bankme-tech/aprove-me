import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateAccountService } from './authenticate-account.service';
import { InvalidCredentials } from '~/common/exceptions/invalid-credentials.exception';
import { HashProvider } from '~/common/providers/hash.provider';
import { InMemoryAccountRepository } from '../../repositories/in-memory/account.repository';
import { IAccountRepository } from '../../repositories/interfaces/account.repository-interface';
import { makeAccount } from '../../test/factories/make-account';
import { JwtModule } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

describe('AuthenticateAccountService', () => {
  let service: AuthenticateAccountService;
  let hasher: HashProvider;
  let repository: InMemoryAccountRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: randomUUID(),
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthenticateAccountService,
        HashProvider,
        {
          useClass: InMemoryAccountRepository,
          provide: IAccountRepository,
        },
      ],
    }).compile();

    service = module.get<AuthenticateAccountService>(
      AuthenticateAccountService,
    );
    repository = module.get(IAccountRepository);
    hasher = module.get(HashProvider);
  });

  it('should authenticate account', async () => {
    const account = makeAccount();

    const plainPassword = account.password;

    const hashedPassword = await hasher.hash(account.password);

    account.password = hashedPassword;

    repository.items.push(account);

    const result = await service.execute({
      login: account.login,
      password: plainPassword,
    });

    expect(result.isRight()).toBeTruthy();

    if (result.isRight()) {
      expect(result.value).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String),
        }),
      );
    }
  });

  it('should not authenticate account with invalid login', async () => {
    const account = makeAccount();

    repository.items.push(account);

    const result = await service.execute({
      login: 'wrong-login',
      password: account.password,
    });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(NotFoundResource);

    if (result.isLeft()) expect(result.value.message).toEqual('Login invalid.');
  });

  it('should not authenticate account with invalid password', async () => {
    const account = makeAccount();

    repository.items.push(account);

    const result = await service.execute({
      login: account.login,
      password: 'wrong-password',
    });

    expect(result.isLeft()).toBeTruthy();

    expect(result.value).toBeInstanceOf(InvalidCredentials);

    if (result.isLeft())
      expect(result.value.message).toEqual('Password invalid.');
  });
});
