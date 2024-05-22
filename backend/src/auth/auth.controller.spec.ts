import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { SignInDto } from './dto/sign-in.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service = mockDeep<AuthService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(
      AuthService,
    ) as DeepMockProxy<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call AuthService.signIn and return a token', async () => {
    const signInDto: SignInDto = { login: 'aprovame', password: 'aprovame' };
    const token = { access_token: 'mocked-token' };

    service.signIn.mockResolvedValueOnce(token);

    const result = await controller.create(signInDto);

    expect(result).toEqual(token);
    expect(service.signIn).toHaveBeenCalledWith(signInDto);
  });

  it('should throw an error if AuthService.signIn throws', async () => {
    const signInDto: SignInDto = { login: 'wrong', password: 'aprovame' };

    service.signIn.mockRejectedValueOnce(new Error('Unauthorized'));

    await expect(controller.create(signInDto)).rejects.toThrow('Unauthorized');
  });
});
