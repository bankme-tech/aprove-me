import { ConfigService } from '@nestjs/config';
import { InMemoryUsersRepository } from '../domain/repositories/in-memory/in-memory-users.repository';
import { CreateUserUseCase } from './create-user.use-case';
import { User } from '../domain/entities/user.entity';

jest.mock('@nestjs/config', () => ({
  ConfigService: {
    get(param: string) {
      switch (param) {
        case 'cryptRounds':
          return 10;
        default:
          break;
      }
    },
  },
}));

describe('Create assignor use case', () => {
  let entity: User;
  let repository: InMemoryUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  const configService = {
    get(param: string) {
      switch (param) {
        case 'cryptRounds':
          return 10;
        default:
          break;
      }
    },
  } as ConfigService;

  beforeEach(() => {
    entity = new User({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      login: 'logintest',
      password: 'passwordtest',
    });
    repository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(repository, configService);
  });

  it('should be able to create assignor', () => {
    expect(repository.entities).toHaveLength(0);

    createUserUseCase.execute({
      login: entity.login,
      password: entity.password,
    });
  });
});
