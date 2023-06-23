import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let sut: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'access_token' })
          }
        }
      ],
    }).compile();

    sut = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('login', () => {
    it('should call service with correct values', async () => {
      const loginSpy = jest.spyOn(authService, 'login')

      await sut.login(
        {
          email: 'any_email@mail.com',
          password: 'any_password'
        }, 
        {
          user: {id: 1}
        }
      )

      expect(loginSpy).toHaveBeenCalledWith({
        id: 1
      })
    });

    it('should return a token on success', async () => {
      const response = await sut.login(
        {
          email: 'any_email@mail.com',
          password: 'any_password'
        }, 
        {
          id: 1
        }
      )

      expect(response).toEqual({
        access_token: 'access_token'
      })
    });
  });
});
