import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Assignor } from '@prisma/client';
import { Context, MockContext, createMockContext } from 'src/db/db.mock';
import { UpdateAssignorDto } from './dto/assignor.dto';
import { DbService } from 'src/db/db.service';
import { AssignorRepository } from './assignor.repository';

describe('AssignorRepository', () => {
  let repository: AssignorRepository;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorRepository,
        {
          provide: DbService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    repository = moduleRef.get<AssignorRepository>(AssignorRepository);
  });

  describe('findById', () => {
    test('should return an assignor by id', async () => {
      const assignor: Assignor = {
        id: 'any-id',
        document: 'any-document',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };

      mockCtx.prisma.assignor.findUnique.mockResolvedValueOnce(assignor);

      const result = await repository.findById(assignor.id);
      expect(result).toEqual(assignor);
    });

    test('should return null if assignor does not exist', async () => {
      mockCtx.prisma.assignor.findUnique.mockResolvedValueOnce(null);

      const result = await repository.findById('any-id');
      expect(result).toBe(null);
    });

    test('should throw if DbService throws', async () => {
      const id = 'any-id';
      const errorMessage = 'Database error';

      mockCtx.prisma.assignor.findUnique.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.findById(id)).rejects.toThrow(errorMessage);
    });
  });

  describe('create', () => {
    test('should create an assignor', async () => {
      const assignor: Assignor = {
        id: 'any-id',
        document: 'any-document',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      const dto: Prisma.AssignorCreateInput = {
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      };

      mockCtx.prisma.assignor.create.mockResolvedValueOnce(assignor);

      const result = await repository.create(dto);
      expect(result).toEqual(assignor);
    });

    test('should throw if DbService throws', async () => {
      const dto: Prisma.AssignorCreateInput = {
        document: 'any-document',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      const errorMessage = 'Database error';

      mockCtx.prisma.assignor.create.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.create(dto)).rejects.toThrow(errorMessage);
    });
  });

  describe('update', () => {
    test('should update an assignor', async () => {
      const assignor: Assignor = {
        id: 'any-id',
        document: 'updated-document',
        email: 'updated-email',
        name: 'updated-name',
        phone: 'updated-phone',
      };
      const dto: UpdateAssignorDto = {
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      };

      mockCtx.prisma.assignor.update.mockResolvedValueOnce(assignor);

      const result = await repository.update(assignor.id, dto);
      expect(result).toEqual(assignor);
    });

    test('should throw if DbService throws', async () => {
      const id = 'any-id';
      const dto: UpdateAssignorDto = {
        document: 'updated-document',
        email: 'updated-email',
        name: 'updated-name',
        phone: 'updated-phone',
      };
      const errorMessage = 'Database error';

      mockCtx.prisma.assignor.update.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.update(id, dto)).rejects.toThrow(errorMessage);
    });
  });

  describe('delete', () => {
    test('should delete an assignor', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-document',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      mockCtx.prisma.assignor.delete.mockResolvedValueOnce(assignor);

      await expect(repository.delete(assignor.id)).resolves.toBeUndefined();
    });

    test('should throw if DbService throws', async () => {
      const id = 'any-id';
      const errorMessage = 'Database error';

      mockCtx.prisma.assignor.delete.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.delete(id)).rejects.toThrow(errorMessage);
    });
  });
});
