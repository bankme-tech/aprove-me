import { Test, TestingModule } from '@nestjs/testing';
import { getUsersSeed } from 'src/infra/database/inMemory/seed';
import { FakeEncrypterAdapter } from 'src/shared/adapters';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

const now = new Date();

const FakeUserService = {
  findOne: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
      providers: [
        AuthService,
        {
          provide: 'Encrypter',
          useClass: FakeEncrypterAdapter,
        },
        {
          provide: JwtService,
          useValue: jest.fn(),
        },
        {
          provide: UserService,
          useValue: FakeUserService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return an user if it matches', async () => {
      const userList = getUsersSeed({ date: now });
      const { password, ...expectedResult } = userList[0];
      const login = 'aprovame';
      const psw = 'aprovame';
      FakeUserService.findOne.mockResolvedValueOnce(userList[0]);

      const result = await service.validateUser(login, psw);

      expect(result).toEqual(expectedResult);
    });

    it('should return null if user login is not found', async () => {
      const login = 'invalid_login';
      const psw = 'aprovame';
      FakeUserService.findOne.mockResolvedValueOnce(undefined);

      const result = await service.validateUser(login, psw);

      expect(result).toBeNull();
    });

    it('should return null if user password does not match', async () => {
      const userList = getUsersSeed({ date: now });
      const login = 'aprovame';
      const psw = 'invalid_password';
      FakeUserService.findOne.mockResolvedValueOnce(userList[0]);

      const result = await service.validateUser(login, psw);

      expect(result).toBeNull();
    });
  });
});
