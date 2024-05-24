import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthEntity } from './entities/auth.entity';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByLogin: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('fake_token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an AuthEntity with access token on successful sign-in', async () => {
      const mockUser = { id: '1', login: 'test_user', password: 'password' };
      jest.spyOn(usersService, 'findByLogin').mockResolvedValue(mockUser);

      const result: AuthEntity = await service.signIn('test_user', 'password');

      expect(result).toEqual({ access_token: 'fake_token' });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: '1',
        login: 'test_user',
      });
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      jest.spyOn(usersService, 'findByLogin').mockResolvedValue(undefined);

      await expect(
        service.signIn('test_user', 'password'),
      ).rejects.toThrowError(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockUser = { id: '1', login: 'test_user', password: 'password' };
      jest.spyOn(usersService, 'findByLogin').mockResolvedValue(mockUser);

      await expect(
        service.signIn('test_user', 'wrong_password'),
      ).rejects.toThrowError(UnauthorizedException);
    });
  });
});
