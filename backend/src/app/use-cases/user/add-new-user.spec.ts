import { InMemoryBcryptRepository } from 'test/repositories/in-memory-bcrypt-adapter-repository';
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository';
import { AddNewUser } from './add-new-user';
import { makeUser } from 'test/factories/user';
import { UserAlreadyExists } from '@/app/errors/user-already-exists';

const makeSut = () => {
  const userMemoryRepository = new InMemoryUserRepository();
  const bcryptAdapter = new InMemoryBcryptRepository();

  const sut = new AddNewUser(userMemoryRepository, bcryptAdapter);

  return { userMemoryRepository, sut };
};

describe('add new user UseCase', () => {
  describe('when pass correct login and password', () => {
    it('creates a new user correctly', async () => {
      const newUser = makeUser();

      const { userMemoryRepository, sut } = makeSut();

      const { user } = await sut.execute({ ...newUser.props });

      expect(userMemoryRepository.user).toHaveLength(1);
      expect(userMemoryRepository.user[0]).toEqual(user);
    });

    it('hashs the password correctly', async () => {
      const newUser = makeUser();

      const { sut } = makeSut();

      const { user } = await sut.execute({ ...newUser.props });

      expect(user.props.password).toBe(
        newUser.props.password.concat('-fakeSalt'),
      );
    });

    describe('when pass wrong login and password', () => {
      it('thows an error if login is longer than 140 characters', async () => {
        const newUser = makeUser({ login: 'a'.repeat(141) });

        const { sut } = makeSut();

        try {
          await sut.execute({ ...newUser.props });
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe(
            'login must be shorter than or equal to 140 characters',
          );
        }
      });

      it('thows an error if login is shorter than 3 characters', async () => {
        const newUser = makeUser({ login: 'a' });

        const { sut } = makeSut();

        try {
          await sut.execute({ ...newUser.props });
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe(
            'login must be longer than or equal to 3 characters',
          );
        }
      });

      it('thows an error if password is not strong enough', async () => {
        const newUser = makeUser({ password: 'weakpassword' });

        const { sut } = makeSut();

        try {
          await sut.execute({ ...newUser.props });
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('weakpassword');
        }
      });
    });

    describe('when try to register the same user twice', () => {});
    it('doesnt create the same user twice', async () => {
      const newUser = makeUser();

      const { sut, userMemoryRepository } = makeSut();

      const { user } = await sut.execute({ ...newUser.props });

      expect(userMemoryRepository.user).toHaveLength(1);
      expect(userMemoryRepository.user[0]).toEqual(user);

      try {
        await sut.execute({ ...newUser.props });
      } catch (error) {
        expect(error).toBeInstanceOf(UserAlreadyExists);
        expect(error.message).toBe('user already exists');
        expect(userMemoryRepository.user).toHaveLength(1);
      }
    });
  });
});
