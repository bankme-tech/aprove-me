import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infra/database/prisma/services';
import { PrismaPermissionRepository } from './permission.repository';

const permission = {
  id: '1e81c372-288e-4a2c-ba1f-cea93d838a02',
  login: 'user@example.com',
  password: 'password123',
};

describe('PrismaPermissionRepository', () => {
  let repository: PrismaPermissionRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const mockPrismaService = {
      permission: {
        create: jest.fn().mockResolvedValue(0),
        findFirst: jest.fn().mockResolvedValue(permission),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaPermissionRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<PrismaPermissionRepository>(
      PrismaPermissionRepository,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('findBy', () => {
    it('should return null if no permission is found', async () => {
      jest
        .spyOn(prismaService.permission, 'findFirst')
        .mockResolvedValueOnce(null);

      const result = await repository.findBy('aprovame', 'aprovame');
      expect(result).toBeNull();
    });

    it('should return a permission if found', async () => {
      const result = await repository.findBy(
        permission.login,
        permission.password,
      );
      expect(result).toStrictEqual(permission);
    });
  });

  describe('register', () => {
    it('should register a new permission', async () => {
      await repository.register('newuser@example.com', 'newpassword123');

      expect(prismaService.permission.create).toHaveBeenCalledTimes(1);
      expect(prismaService.permission.create).toHaveBeenCalledWith({
        data: {
          login: 'newuser@example.com',
          password: 'newpassword123',
        },
      });
    });
  });
});
