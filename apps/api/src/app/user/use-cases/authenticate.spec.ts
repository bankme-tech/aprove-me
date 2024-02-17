import { InMemoryUserRepository } from '@/database/repositories/in-memory/in-memory-user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUseCase, AuthenticateUseCaseError } from './authenticate';
import { makeUser } from '@test/factories/user.factory';

const jwtService = new JwtService();
const passwordHash =
  '$2b$12$KZFC4BHQ3i15/5r8CyYEqunKgClhPoGKrzw5N2PquaDnV8LXVdKFW'; // 12345678

let userRepository = new InMemoryUserRepository();
let service = new AuthenticateUseCase(userRepository, jwtService);

jest.spyOn(jwtService, 'sign').mockImplementation(() => 'jwt-token');

describe('AuthenticateUseCase', () => {
  beforeAll(() => {
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'jwt-token');
  });

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    service = new AuthenticateUseCase(userRepository, jwtService);
  });

  it('should be able to authenticate user', async () => {
    const savedUser = makeUser({ username: 'victor', password: passwordHash });
    userRepository.create(savedUser);

    const result = await service.execute({
      username: 'victor',
      password: '12345678',
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.isRight() && result.value.token).toBe('jwt-token');
  });

  it('should not be able to authenticate user with invalid password', async () => {
    const savedUser = makeUser({ username: 'victor', password: passwordHash });
    userRepository.create(savedUser);

    const result = await service.execute({
      username: 'victor',
      password: 'invalid-password',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBe(AuthenticateUseCaseError.INVALID_CREDENTIALS);
  });

  it('should not be able to authenticate with inexistent user', async () => {
    const result = await service.execute({
      username: 'inexistent-user',
      password: '12345678910',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBe(AuthenticateUseCaseError.INVALID_CREDENTIALS);
  });
});
