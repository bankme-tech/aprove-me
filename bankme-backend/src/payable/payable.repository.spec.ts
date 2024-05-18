import { Test, TestingModule } from '@nestjs/testing';
import { Payable } from '@prisma/client';
import { Context, MockContext, createMockContext } from 'src/db/db.mock';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { DbService } from 'src/db/db.service';
import { PayableRepository } from './payable.repository';

describe('PayableRepository', () => {
  let repository: PayableRepository;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PayableRepository,
        {
          provide: DbService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    repository = moduleRef.get<PayableRepository>(PayableRepository);
  });

  describe('findById', () => {
    test('should return an payable by id', async () => {
      const payable: Payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      mockCtx.prisma.payable.findUnique.mockResolvedValueOnce(payable);

      const result = await repository.findById(payable.id);
      expect(result).toEqual(payable);
    });

    test('should return null if payable does not exist', async () => {
      mockCtx.prisma.payable.findUnique.mockResolvedValueOnce(null);

      const result = await repository.findById('any-id');
      expect(result).toBe(null);
    });

    test('should throw if DbService throws', async () => {
      const id = 'any-id';
      const errorMessage = 'Database error';

      mockCtx.prisma.payable.findUnique.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.findById(id)).rejects.toThrow(errorMessage);
    });
  });

  describe('create', () => {
    test('should create an payable', async () => {
      const payable: Payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };
      const dto: CreatePayableDto = {
        value: payable.value,
        emissionDate: payable.emissionDate,
        assignorId: payable.assignorId,
      };

      mockCtx.prisma.payable.create.mockResolvedValueOnce(payable);

      const result = await repository.create(dto);
      expect(result).toEqual(payable);
    });

    test('should throw if DbService throws', async () => {
      const dto: CreatePayableDto = {
        value: 10,
        emissionDate: new Date(),
        assignorId: 'any-id',
      };
      const errorMessage = 'Database error';

      mockCtx.prisma.payable.create.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.create(dto)).rejects.toThrow(errorMessage);
    });
  });

  describe('update', () => {
    test('should update an payable', async () => {
      const payable: Payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };
      const dto: UpdatePayableDto = {
        assignorId: payable.id,
        emissionDate: payable.emissionDate,
        value: payable.value,
      };

      mockCtx.prisma.payable.update.mockResolvedValueOnce(payable);

      const result = await repository.update(payable.id, dto);
      expect(result).toEqual(payable);
    });

    test('should throw if DbService throws', async () => {
      const id = 'any-id';
      const dto: UpdatePayableDto = {
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };
      const errorMessage = 'Database error';

      mockCtx.prisma.payable.update.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.update(id, dto)).rejects.toThrow(errorMessage);
    });
  });

  describe('delete', () => {
    test('should delete an payable', async () => {
      const payable: Payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };
      mockCtx.prisma.payable.delete.mockResolvedValueOnce(payable);

      await expect(repository.delete(payable.id)).resolves.toBeUndefined();
    });

    test('should throw if DbService throws', async () => {
      const id = 'any-id';
      const errorMessage = 'Database error';

      mockCtx.prisma.payable.delete.mockRejectedValueOnce(
        new Error(errorMessage),
      );

      await expect(repository.delete(id)).rejects.toThrow(errorMessage);
    });
  });
});
