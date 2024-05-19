import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '@user/user.service';
import { AuthController } from './auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@user/repositories/user-repository';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UserService, JwtService, { provide: UserRepository, useValue: {} }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token', async () => {
    jest.spyOn(authService, 'signIn').mockResolvedValue({ token: 'token' });

    const token = await controller.signIn({ login: 'login', password: 'password' });

    expect(token).toEqual({ token: 'token' });
  });
});
