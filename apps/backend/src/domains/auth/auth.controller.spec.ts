import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('signin', () => {
    it('it should return the user info with the access token', async () => {
      const token = 'mockup-token';
      const result = { id: 'mockup-id', login: 'mockup-test' };
      jest.spyOn(authService, 'signIn').mockImplementation(async () => result);
      jest.spyOn(authService, 'token').mockImplementation(async () => token);

      const response = await authController.signin({
        login: result.login,
        password: 'asd',
      });

      expect(response).toStrictEqual({ token, data: result });
    });
  });

  describe('signup', () => {
    it('it should create a new user info with the access token', async () => {
      const token = 'mockup-token';
      const result = { id: 'mockup-id', login: 'mockup-test' };
      jest.spyOn(authService, 'signUp').mockImplementation(async () => result);
      jest.spyOn(authService, 'token').mockImplementation(async () => token);

      const response = await authController.signup({
        login: result.login,
        password: 'asd',
      });

      expect(response).toStrictEqual({ token, data: result });
    });
  });

  describe('current', () => {
    it('it should return an existing user based on the current token', async () => {
      const result = { id: 'mockup-id', login: 'mockup-test' };

      const response = await authController.current({
        user: result,
      });

      expect(response).toStrictEqual({ data: result });
    });
  });
});
