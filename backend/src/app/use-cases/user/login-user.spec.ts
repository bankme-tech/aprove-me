import { InMemoryBcryptRepository } from 'test/repositories/in-memory-bcrypt-adapter-repository';
import { InMemoryJwtAdapterRepository } from 'test/repositories/in-memory-jwt-adapter-repository';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { LoginUser } from '@/app/use-cases/user/login-user';
import { makeUser } from 'test/factories/user';
import { User } from '@/app/entities/user';
import { UserNotFound } from '@/app/errors/user-not-found';

const makeSut = () => {
  const userMemoryRepository = new InMemoryUserRepository();
  const bcryptAdapter = new InMemoryBcryptRepository();
  const jwtAdapter = new InMemoryJwtAdapterRepository();

  const sutCase = new LoginUser(
    userMemoryRepository,
    bcryptAdapter,
    jwtAdapter,
  );

  return { userMemoryRepository, sutCase };
};

describe('login user use-case', () => {
  describe('when user exists', () => {
    let user: User;
    let sut: LoginUser;
    let inMemoryUserRepository: InMemoryUserRepository;

    beforeEach(async () => {
      const { sutCase, userMemoryRepository } = makeSut();
      inMemoryUserRepository = userMemoryRepository;
      sut = sutCase;
      user = makeUser();

      await inMemoryUserRepository.create(user);
    });

    describe('and login is correct', () => {
      it('realizes the login correctly', async () => {
        const { acessToken } = await sut.execute({
          ...user.props,
        });

        expect(acessToken).toBeDefined();
      });
    });

    describe('and login is wrong', () => {
      it('doesnt realizes the login', async () => {
        let token: string;

        try {
          const { acessToken } = await sut.execute({
            login: 'wronglogin',
            password: 'wrongpassword',
          });
          token = acessToken;
        } catch (error) {
          expect(error).toBeInstanceOf(UserNotFound);
          expect(error.message).toBe('user not found');
          expect(token).not.toBeDefined();
        }
      });
    });
  });

  describe('when user doesnt exists', () => {
    it('doesnt realizes the login', async () => {
      let token: string;
      const { sutCase } = makeSut();

      try {
        const { acessToken } = await sutCase.execute({
          login: 'wronglogin',
          password: 'wrongpassword',
        });
        token = acessToken;
      } catch (error) {
        expect(error).toBeInstanceOf(UserNotFound);
        expect(error.message).toBe('user not found');
        expect(token).not.toBeDefined();
      }
    });
  });
});
