import { Test, TestingModule } from '@nestjs/testing';
import { PrismaAssignorRepository } from './prisma-assignor.repository';
import { PrismaService } from '@infra/database/prisma/services';
import { Assignor } from '@core/assignor/model';

const assignor = {
  id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
  name: 'Elves',
  phone: '85999999999',
  email: 'elves@mail.com',
  document: '99765643211',
};

describe('PrismaAssignorRepository', () => {
  let repository: PrismaAssignorRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const PrismaServiceProvider = {
      provide: PrismaService,
      useValue: {
        assignor: {
          upsert: jest.fn().mockResolvedValue(0),
          delete: jest.fn().mockResolvedValue(0),
          findUnique: jest.fn().mockResolvedValue(assignor),
        },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaAssignorRepository, PrismaServiceProvider],
    }).compile();

    repository = module.get<PrismaAssignorRepository>(PrismaAssignorRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('findById', () => {
    it('should return null if no assignor is found', async () => {
      jest
        .spyOn(prismaService.assignor, 'findUnique')
        .mockResolvedValueOnce(null);

      const result = await repository.findById('123');

      expect(result).toBeNull();
    });

    it('should return an assignor if found', async () => {
      const result = await repository.findById(assignor.id);

      const expectedResult = Assignor.create(assignor);

      expect(result).toStrictEqual(expectedResult);
    });
  });

  describe('save', () => {
    it('should upsert an assignor', async () => {
      const newAssignor = Assignor.create({
        id: '123',
        name: 'John Doe',
        phone: '123456789',
        email: 'john@example.com',
        document: '123456789',
      });

      await repository.save(newAssignor);

      expect(prismaService.assignor.upsert).toHaveBeenCalledTimes(1);
      expect(prismaService.assignor.upsert).toHaveBeenCalledWith({
        where: { id: newAssignor.id },
        update: {
          name: newAssignor.name,
          phone: newAssignor.phone,
          email: newAssignor.email,
          document: newAssignor.document,
        },
        create: {
          id: newAssignor.id,
          name: newAssignor.name,
          phone: newAssignor.phone,
          email: newAssignor.email,
          document: newAssignor.document,
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete an assignor', async () => {
      await repository.delete(assignor.id);

      expect(prismaService.assignor.delete).toHaveBeenCalledTimes(1);
      expect(prismaService.assignor.delete).toHaveBeenCalledWith({
        where: { id: assignor.id },
      });
    });
  });
});
