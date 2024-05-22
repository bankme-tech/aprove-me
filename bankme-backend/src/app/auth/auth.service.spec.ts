import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { CredentialsDto } from './dto/auth.dto';
import { UserService } from 'src/app/user/user.service';
import { CryptoService } from 'src/app/crypto/crypto.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let cryptoService: CryptoService;
  let jwtService: JwtService;

  const mockUserService = {
    findByLogin: jest.fn(),
  };

  const mockCryptoService = {
    compare: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: CryptoService, useValue: mockCryptoService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    cryptoService = module.get<CryptoService>(CryptoService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const credentialsDto: CredentialsDto = {
      login: 'any-login',
      password: 'any-password',
    };

    test('should return access token when authentication succeeds', async () => {
      const user = {
        id: 'any-id',
        login: credentialsDto.login,
        password: 'hashed-password',
      };
      const accessToken = 'fake-access-token';

      jest.spyOn(userService, 'findByLogin').mockResolvedValueOnce(user);
      jest.spyOn(cryptoService, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce(accessToken);

      const result = await authService.signIn(credentialsDto);

      expect(result).toEqual({ access_token: accessToken });
      expect(userService.findByLogin).toHaveBeenCalledWith(
        credentialsDto.login,
      );
      expect(cryptoService.compare).toHaveBeenCalledWith(
        credentialsDto.password,
        user.password,
      );
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.id,
        login: user.login,
      });
    });

    test('should throw an UnauthorizedException when login is invalid', async () => {
      jest.spyOn(userService, 'findByLogin').mockResolvedValueOnce(null);

      await expect(authService.signIn(credentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(userService.findByLogin).toHaveBeenCalledWith(
        credentialsDto.login,
      );
      expect(cryptoService.compare).not.toHaveBeenCalled();
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });

    test('should throw an UnauthorizedException when password is invalid', async () => {
      const user = {
        id: 'any-id',
        login: credentialsDto.login,
        password: 'hashed-password',
      };

      jest.spyOn(userService, 'findByLogin').mockResolvedValueOnce(user);
      jest.spyOn(cryptoService, 'compare').mockResolvedValueOnce(false);

      await expect(authService.signIn(credentialsDto)).rejects.toThrowError(
        UnauthorizedException,
      );

      expect(userService.findByLogin).toHaveBeenCalledWith(
        credentialsDto.login,
      );
      expect(cryptoService.compare).toHaveBeenCalledWith(
        credentialsDto.password,
        user.password,
      );
      expect(jwtService.signAsync).not.toHaveBeenCalled();
    });
  });
});
