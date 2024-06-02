import { Test, TestingModule } from '@nestjs/testing';
import { PermissionRepository } from '@core/auth/ports';
import { RegisterPermissionUseCase } from '@core/auth/usecases';

describe('RegisterPermissionUseCase', () => {
  let sut: RegisterPermissionUseCase;
  let permissionRepository: PermissionRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const PermissionRepositoryProvider = {
      provide: PermissionRepository,
      useValue: {
        findBy: jest.fn().mockResolvedValue(null),
        register: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [RegisterPermissionUseCase, PermissionRepositoryProvider],
    }).compile();

    sut = app.get<RegisterPermissionUseCase>(RegisterPermissionUseCase);
    permissionRepository = app.get<PermissionRepository>(PermissionRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(permissionRepository).toBeDefined();
  });

  describe('execute', () => {
    const input = {
      login: 'aprovame',
      password: 'aprovame',
    };

    it('should call permissionRepository register with correct values', async () => {
      await sut.execute(input);

      expect(permissionRepository.register).toHaveBeenCalledTimes(1);
      expect(permissionRepository.register).toHaveBeenCalledWith(
        input.login,
        'aprovame',
      );
    });
  });
});
