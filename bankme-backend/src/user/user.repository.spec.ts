import { Test, TestingModule } from '@nestjs/testing';
import { Context, createMockContext, MockContext } from 'src/db/db.mock';
import { DbService } from 'src/db/db.service';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: DbService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    repository = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('create', () => {
    test('should create and return a user', async () => {
      const user = {
        id: 'any_id',
        login: 'any-login',
        password: 'any-password',
      };
      const dto = {
        login: user.login,
        password: user.password,
      };

      mockCtx.prisma.user.create.mockResolvedValueOnce(user);

      const result = await repository.create(dto);
      expect(result).toEqual(user);
      expect(mockCtx.prisma.user.create).toHaveBeenCalledWith({
        data: {
          login: user.login,
          password: user.password,
        },
      });
    });

    test('should throw if dbService throws', async () => {
      const dto = {
        login: 'any-login',
        password: 'any-password',
      };
      const errorMessage = 'error';
      mockCtx.prisma.user.create.mockRejectedValueOnce(new Error(errorMessage));

      await expect(repository.create(dto)).rejects.toThrow(
        new Error(errorMessage),
      );
    });
  });

  describe('findByLogin', () => {
    test('should find and return a user by login', async () => {
      const user = {
        id: 'any_id',
        login: 'any-login',
        password: 'any-password',
      };

      mockCtx.prisma.user.findUnique.mockResolvedValueOnce(user);

      const result = await repository.findByLogin(user.login);

      expect(result).toEqual(user);
      expect(mockCtx.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { login: user.login },
      });
    });

    test('should return null if user not found', async () => {
      mockCtx.prisma.user.findUnique.mockResolvedValueOnce(null);

      const result = await repository.findByLogin('');

      expect(result).toBeNull();
      expect(mockCtx.prisma.user.findUnique).toHaveBeenCalledWith({
        where: { login: '' },
      });
    });
  });
});
