import { Test } from '@nestjs/testing';
import { AuthController } from './auth/controllers/auth.controller';
import { AuthService } from './auth/service/auth.service';
import { AuthCredentialsDto } from './auth/dto/auth-credentials.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a token when login is successful', async () => {
      const authCredentialsDto: AuthCredentialsDto = {
        login: 'aprovame',
        password: 'aprovame',
      };
      const expectedToken = 'fakeToken';

      jest
        .spyOn(authService, 'login')
        .mockImplementation(async () => expectedToken);

      const result = await authController.login(authCredentialsDto);

      expect(result).toEqual({ token: expectedToken });
    });

    it('should throw an unauthorized exception when login is unsuccessful', async () => {
      const authCredentialsDto: AuthCredentialsDto = {
        login: 'invalid',
        password: 'invalid',
      };

      jest.spyOn(authService, 'login').mockImplementation(async () => null);

      await expect(
        authController.login(authCredentialsDto),
      ).rejects.toThrowError(
        new HttpException('Não autorizado', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
