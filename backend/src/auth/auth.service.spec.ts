import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { SignInDto } from './dto/sign-in.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as utils from '../utils';

jest.mock('../utils', () => ({
  hashPassword: jest.fn(),
  comparePassword: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usersServiceMock: DeepMockProxy<UsersService>;
  let jwtServiceMock: DeepMockProxy<JwtService>;

  beforeEach(async () => {
    usersServiceMock = mockDeep<UsersService>();
    jwtServiceMock = mockDeep<JwtService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token for valid credentials', async () => {
      const signInDto: SignInDto = { login: 'testuser', password: 'password' };
      const user = {
        username: 'testuser',
        password: 'hashedpassword',
        role: 'user',
      };

      usersServiceMock.findByUsername.mockResolvedValue(user as any);
      (utils.comparePassword as jest.Mock).mockResolvedValue(true);
      jwtServiceMock.signAsync.mockResolvedValue('token');

      const result = await authService.signIn(signInDto);

      expect(result).toEqual({ access_token: 'token' });
      expect(usersServiceMock.findByUsername).toHaveBeenCalledWith(
        'testuser',
        true,
      );
      expect(utils.comparePassword).toHaveBeenCalledWith(
        'password',
        'hashedpassword',
      );
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
        { username: 'testuser', role: 'user' },
        { expiresIn: '1m' },
      );
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const signInDto: SignInDto = { login: 'testuser', password: 'password' };

      usersServiceMock.findByUsername.mockResolvedValue(null);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const signInDto: SignInDto = { login: 'testuser', password: 'password' };
      const user = {
        username: 'testuser',
        password: 'hashedpassword',
        role: 'user',
      };

      usersServiceMock.findByUsername.mockResolvedValue(user as any);
      (utils.comparePassword as jest.Mock).mockResolvedValue(false);

      await expect(authService.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('hashPassword', () => {
    it('should hash the password', async () => {
      const password = 'password';
      const hashedPassword = 'hashedpassword';

      (utils.hashPassword as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await authService.hashPassword(password);

      expect(result).toEqual(hashedPassword);
      expect(utils.hashPassword).toHaveBeenCalledWith(password);
    });
  });

  describe('comparePassword', () => {
    it('should compare the password with the hash', async () => {
      const password = 'password';
      const hash = 'hashedpassword';

      (utils.comparePassword as jest.Mock).mockResolvedValue(true);

      const result = await authService.comparePassword(password, hash);

      expect(result).toBe(true);
      expect(utils.comparePassword).toHaveBeenCalledWith(password, hash);
    });
  });
});
