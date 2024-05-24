import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

const mockAuthService = {
  access_token: 'access_token',
};

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('access_token'),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneByLogin: jest.fn().mockResolvedValue({
              id: '1',
              login: 'login',
              password: 'password',
            }),
            comparePasswords: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token', async () => {
      // Arrange
      const login = 'login';
      const password = 'password';

      // Act
      const result = await authService.signIn(login, password);

      // Assert
      expect(result).toEqual(mockAuthService);
    });

    it('should throw an error when user not found', async () => {
      // Arrange
      jest.spyOn(usersService, 'findOneByLogin').mockResolvedValueOnce(null);

      // Act
      const result = authService.signIn('login', 'password');

      // Assert
      await expect(result).rejects.toThrow('Invalid login or password');
    });

    it('should throw an error when password is invalid', async () => {
      // Arrange
      jest.spyOn(usersService, 'comparePasswords').mockResolvedValueOnce(false);

      // Act
      const result = authService.signIn('login', 'password');

      // Assert
      await expect(result).rejects.toThrow('Invalid login or password');
    });
  });
});
