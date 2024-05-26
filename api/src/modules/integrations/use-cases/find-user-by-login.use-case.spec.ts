import { User } from '../domain/entities/user.entity';
import { InMemoryUsersRepository } from '../domain/repositories/in-memory/in-memory-users.repository';
import { FindUserByLoginUseCase } from './find-user-by-login.use-case';

describe('Delete assignor use case', () => {
  let entity: User;
  let repository: InMemoryUsersRepository;
  let findUserByLoginUseCase: FindUserByLoginUseCase;

  beforeEach(() => {
    entity = new User({
      id: 'fe795d1c-0dd7-4d8e-9d79-4307fb5be4b0',
      login: 'login',
      password: 'pass',
    });
    repository = new InMemoryUsersRepository();
    findUserByLoginUseCase = new FindUserByLoginUseCase(repository);
  });

  it('should be able to find all', async () => {
    await repository.create(entity);

    const user = await findUserByLoginUseCase.execute('login');

    expect(user.login).toBe('login');
  });
});
