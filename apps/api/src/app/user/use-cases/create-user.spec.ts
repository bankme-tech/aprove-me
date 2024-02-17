import { InMemoryUserRepository } from '@/database/repositories/in-memory/in-memory-user.repository';
import { CreateUserUseCase, CreateUserUseCaseError } from './create-user';
import { makeUser } from '@test/factories/user.factory';

let userRepository = new InMemoryUserRepository();
let service = new CreateUserUseCase(userRepository);

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    service = new CreateUserUseCase(userRepository);
  });

  it('should be able to create new user', async () => {
    const result = await service.execute({
      username: 'johndoe',
      password: '12345678',
    });

    expect(result.isRight()).toBeTruthy();
    expect(userRepository.users.length).toBe(1);
  });

  it('should not be able to create user with small password', async () => {
    const result = await service.execute({
      username: 'johndoe',
      password: 'small',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBe(CreateUserUseCaseError.PASSWORD_TOO_SMALL);
  });

  it('should not be able to create user with already used username', async () => {
    const createdUser = makeUser({ username: 'same-username' });

    userRepository.users.push(createdUser);

    const result = await service.execute({
      username: 'same-username',
      password: '12345678',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBe(CreateUserUseCaseError.USERNAME_ALREADY_IN_USE);
  });
});
