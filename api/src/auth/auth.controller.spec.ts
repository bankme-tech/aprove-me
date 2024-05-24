import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authSerivce: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              access_token: 'access_token',
            }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authSerivce = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authSerivce).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token', async () => {
      // Arrange
      const signInDto = {
        login: 'login',
        password: 'password',
      };

      // Act
      const result = await authController.signIn(signInDto);

      // Assert
      expect(result).toEqual({ access_token: 'access_token' });
    });

    it('should throw an error', async () => {
      // Arrange
      const signInDto = {
        login: 'login',
        password: 'password',
      };

      jest
        .spyOn(authSerivce, 'signIn')
        .mockRejectedValue(
          new UnauthorizedException('Invalid login or password'),
        );

      // Act
      try {
        await authController.signIn(signInDto);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Invalid login or password');
      }
    });
  });
});
