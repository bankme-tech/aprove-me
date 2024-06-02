import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthenticateUseCase } from '@core/auth/usecases';
import { SignToken, PermissionRepository } from '@core/auth/ports';

describe('AuthenticateUseCase', () => {
  let sut: AuthenticateUseCase;
  let token: SignToken;
  let userRepository: PermissionRepository;

  const permission = {
    id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
    login: 'aprovame',
    password: 'aprovame',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const PermissionRepositoryProvider = {
      provide: PermissionRepository,
      useValue: {
        findBy: jest.fn().mockResolvedValue(permission),
      },
    };

    const SignTokenProvider = {
      provide: SignToken,
      useValue: {
        signAsync: jest.fn().mockResolvedValue('accessToken'),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUseCase,
        PermissionRepositoryProvider,
        SignTokenProvider,
      ],
    }).compile();

    sut = app.get<AuthenticateUseCase>(AuthenticateUseCase);
    userRepository = app.get<PermissionRepository>(PermissionRepository);
    token = app.get<SignToken>(SignToken);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(token).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('execute', () => {
    const input = {
      login: 'aprovame',
      password: 'aprovame',
    };

    it('should call find by credentials with correct values', async () => {
      await sut.execute(input);

      expect(userRepository.findBy).toHaveBeenCalledTimes(1);
      expect(userRepository.findBy).toHaveBeenCalledWith(
        input.login,
        input.password,
      );
    });

    it('should throw UnauthorizedException if permission not found', async () => {
      jest.spyOn(userRepository, 'findBy').mockResolvedValueOnce(null);

      await expect(sut.execute(input)).rejects.toThrow(UnauthorizedException);
    });

    it('should call sign token with correct values', async () => {
      await sut.execute(input);

      expect(token.signAsync).toHaveBeenCalledTimes(1);
      expect(token.signAsync).toHaveBeenCalledWith({ sub: permission.login });
    });

    it('should be return an accessToken with success', async () => {
      const result = await sut.execute(input);

      expect(result).toStrictEqual({
        accessToken: 'accessToken',
      });
    });
  });
});
