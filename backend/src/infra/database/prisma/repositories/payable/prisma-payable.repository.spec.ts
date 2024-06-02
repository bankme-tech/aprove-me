import { Test, TestingModule } from '@nestjs/testing';
import { PrismaPayableRepository } from './prisma-payable.repository';
import { PrismaService } from '@infra/database/prisma/services';
import { Payable } from '@core/payable/model';

const payable = {
  id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
  value: 100.5,
  emissionDate: new Date('2023-06-01T00:00:00Z'),
  assignor: '65b1c7d4-0f3a-4386-b0ef-32202f36b27c',
};

describe('PrismaPayableRepository', () => {
  let repository: PrismaPayableRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const PrismaServiceProvider = {
      provide: PrismaService,
      useValue: {
        payable: {
          delete: jest.fn().mockResolvedValue(0),
          create: jest.fn().mockResolvedValue(payable),
          findUnique: jest.fn().mockResolvedValue(payable),
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaPayableRepository, PrismaServiceProvider],
    }).compile();

    repository = module.get<PrismaPayableRepository>(PrismaPayableRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('findById', () => {
    it('should return null if no payable is found', async () => {
      jest
        .spyOn(prismaService.payable, 'findUnique')
        .mockResolvedValueOnce(null);

      const result = await repository.findById(payable.id);

      expect(result).toBeNull();
    });

    it('should return a payable if found', async () => {
      const result = await repository.findById(payable.id);

      const expectedResult = Payable.create(payable);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('save', () => {
    it('should create a payable', async () => {
      const newPayable = Payable.create(payable);

      await repository.save(newPayable);

      expect(prismaService.payable.create).toHaveBeenCalledTimes(1);
      expect(prismaService.payable.create).toHaveBeenCalledWith({
        data: {
          id: newPayable.id,
          value: newPayable.value,
          emissionDate: newPayable.emissionDate,
          assignor: newPayable.assignor,
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete a payable', async () => {
      await repository.delete(payable.id);

      expect(prismaService.payable.delete).toHaveBeenCalledTimes(1);
      expect(prismaService.payable.delete).toHaveBeenCalledWith({
        where: { id: payable.id },
      });
    });
  });
});
