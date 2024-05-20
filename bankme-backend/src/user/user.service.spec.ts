import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let cryptoService: CryptoService;

  const mockRepository = {
    create: jest.fn(),
    findByLogin: jest.fn(),
  };

  const mockCryptoService = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: CryptoService,
          useValue: mockCryptoService,
        },
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
    repository = moduleRef.get<UserRepository>(UserRepository);
    cryptoService = moduleRef.get<CryptoService>(CryptoService);
  });

  describe('create', () => {
    test('should create and return an user', async () => {
      const dto: CreateUserDto = {
        login: 'any-login',
        password: 'any-password',
      };
      const hash = 'hashPassword';
      const user = {
        id: 'any-id',
        login: dto.login,
        password: hash,
      };

      jest.spyOn(cryptoService, 'hash').mockResolvedValueOnce(hash);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(user);

      const result = await service.create(dto);

      expect(cryptoService.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(repository.create).toHaveBeenCalledWith({
        login: dto.login,
        password: hash,
      });
      expect(result).toEqual(user.id);
    });
  });

  describe('findByLogin', () => {
    test('should return the user when found', async () => {
      const login = 'any-login';
      const user = {
        id: 'any-id',
        login: login,
        password: 'any-password',
      };

      mockRepository.findByLogin.mockResolvedValueOnce(user);

      const result = await service.findByLogin(login);

      expect(result).toEqual(user);
      expect(mockRepository.findByLogin).toHaveBeenCalledWith(login);
    });

    test('should return null when user not found', async () => {
      const login = 'any-login';

      mockRepository.findByLogin.mockResolvedValueOnce(null);

      const result = await service.findByLogin(login);

      expect(result).toBeNull();
      expect(mockRepository.findByLogin).toHaveBeenCalledWith(login);
    });
  });
});
