import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticateAccountController } from './authenticate-account.controller';
import { AuthenticateAccountService } from '../services/authenticate-account/authenticate-account.service';
import { HashProvider } from '~/common/providers/hash.provider';
import { InMemoryAccountRepository } from '../repositories/in-memory/account.repository';
import { IAccountRepository } from '../repositories/interfaces/account.repository-interface';
import { JwtModule } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';
import { makeAccount } from '../test/factories/make-account';

describe('AuthenticateAccountController', () => {
  let controller: AuthenticateAccountController;
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
      controllers: [AuthenticateAccountController],
      providers: [
        AuthenticateAccountService,
        HashProvider,
        {
          useClass: InMemoryAccountRepository,
          provide: IAccountRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthenticateAccountController>(
      AuthenticateAccountController,
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

    const result = await controller.handle({
      login: account.login,
      password: plainPassword,
    });

    expect(result).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      }),
    );
  });
});
