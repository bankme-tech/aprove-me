import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import * as bcrypt from 'bcrypt';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hash', () => {
    it('should return a hashed string', async () => {
      const value = 'testValue';
      const salt = 10;
      const hashedValue = 'hashedValue';

      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementationOnce(() => Promise.resolve(hashedValue));

      const result = await service.hash(value, salt);

      expect(result).toBe(hashedValue);
      expect(bcrypt.hash).toHaveBeenCalledWith(value, salt);
    });
  });

  describe('compare', () => {
    it('should return true for a valid comparison', async () => {
      const value = 'testValue';
      const hash = 'hashedValue';

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(true));

      const result = await service.compare(value, hash);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(value, hash);
    });

    it('should return false for an invalid comparison', async () => {
      const value = 'testValue';
      const hash = 'hashedValue';

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementationOnce(() => Promise.resolve(false));

      const result = await service.compare(value, hash);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(value, hash);
    });
  });
});
