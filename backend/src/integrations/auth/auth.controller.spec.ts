import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthEntity } from './entities/auth.entity';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return AuthEntity and HTTP status 200 on successful sign-in', async () => {
      const signInDto: SignInDto = {
        login: 'user@example.com',
        password: 'password',
      };
      const authEntity: AuthEntity = {
        access_token: 'fake_token',
      };
      jest.spyOn(authService, 'signIn').mockResolvedValue(authEntity);

      const result = await controller.signIn(signInDto);

      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.login,
        signInDto.password,
      );
      expect(result).toEqual(authEntity);
    });

    it('should return HTTP status 401 when sign-in fails', async () => {
      const signInDto: SignInDto = {
        login: 'userexample',
        password: 'password',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValue(new UnauthorizedException());

      try {
        await controller.signIn(signInDto);
      } catch (error) {
        expect(authService.signIn).toHaveBeenCalledWith(
          signInDto.login,
          signInDto.password,
        );
        expect(error.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
      }
    });
  });
});
