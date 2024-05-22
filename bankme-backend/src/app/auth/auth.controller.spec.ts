import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const credentialsDto: CredentialsDto = {
      login: 'any-login',
      password: 'any-password',
    };

    test('should return an access_token', async () => {
      const token = { access_token: 'fake-access-token' };

      jest.spyOn(authService, 'signIn').mockResolvedValueOnce(token);

      const result = await controller.signIn(credentialsDto);

      expect(result).toEqual(result);
      expect(authService.signIn).toHaveBeenCalledWith(credentialsDto);
    });

    test('should throw an UnauthorizedException when authService throws an exception', async () => {
      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValueOnce(
          new UnauthorizedException('Invalid credentials'),
        );

      await expect(controller.signIn(credentialsDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.signIn).toHaveBeenCalledWith(credentialsDto);
    });
  });
});
