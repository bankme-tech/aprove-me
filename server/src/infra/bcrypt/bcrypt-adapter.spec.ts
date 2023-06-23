import * as bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  compare: async () => {
    return await Promise.resolve(true);
  },
  hash: async () => {
    return await Promise.resolve('hashed_value');
  },
}));

describe('Hasher', () => {
  describe('compare', () => {
    it('should return true on success', async () => {
      const sut = new BcryptAdapter();
      const response = await sut.compare('any_password', 'any_hashed_password');
      expect(response).toBe(true);
    });

    it('should return false if compare returns false', async () => {
      const sut = new BcryptAdapter();
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => new Promise((resolve) => resolve(false)));

      const response = await sut.compare('any_password', 'any_hashed_password');
      expect(response).toBe(false);
    });

    it('should call bcrypt.compare with correct values', async () => {
      const sut = new BcryptAdapter();
      const compareSpy = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_password', 'any_hashed_password');
      expect(compareSpy).toHaveBeenCalledWith(
        'any_password',
        'any_hashed_password',
      ); 
    });
  });

  describe('hash', () => {
    it('should call bcrypt.hash with correct values', async () => {
      const sut = new BcryptAdapter();
      const compareSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(compareSpy).toHaveBeenCalledWith('any_value', 12);
    });

    it('should return a hash on success', async () => {
      const sut = new BcryptAdapter();
      const response = await sut.hash('any_value');
      expect(response).toBe('hashed_value');
    });
  });
});
