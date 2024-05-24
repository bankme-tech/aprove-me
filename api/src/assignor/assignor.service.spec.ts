import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../db/prisma.service';
import { Assignor } from './entities/assignor.entity';

const assignorEntityList = [
  new Assignor(
    '1',
    '12345678901',
    'teste@teste.com',
    '31999999999',
    'Assignor 1',
  ),
  new Assignor(
    '2',
    '98765432109',
    'teste2@teste.com',
    '31999999998',
    'Assignor 2',
  ),
];

const assignorInput = {
  document: '12345678901',
  email: 'teste@teste.com',
  phone: '31999999999',
  name: 'Assignor 1',
};

describe('AssignorService', () => {
  let assignorService: AssignorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        {
          provide: PrismaService,
          useValue: {
            assignor: {
              findMany: jest.fn().mockResolvedValue(assignorEntityList),
              create: jest.fn().mockResolvedValue(assignorEntityList[0]),
              findUniqueOrThrow: jest
                .fn()
                .mockResolvedValue(assignorEntityList[1]),
              findUnique: jest.fn().mockResolvedValue(assignorEntityList[0]),
              update: jest.fn().mockResolvedValue(assignorEntityList[1]),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    assignorService = module.get<AssignorService>(AssignorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(assignorService).toBeDefined();
  });

  describe('create', () => {
    it('should create a assignor', async () => {
      // Arrange
      jest.spyOn(prismaService.assignor, 'findUnique').mockResolvedValue(null);

      // Act
      const assignor = await assignorService.create(assignorInput);

      // Assert
      expect(assignor).toEqual(assignorEntityList[0]);
      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { document: '12345678901' },
      });
      expect(prismaService.assignor.create).toHaveBeenCalledWith({
        data: assignorInput,
      });
    });

    it('should throw an error if assignor already exists', async () => {
      // Arrange
      jest
        .spyOn(prismaService.assignor, 'findUnique')
        .mockResolvedValue(assignorEntityList[0]);

      // Act
      await expect(assignorService.create(assignorInput)).rejects.toThrow(
        'Assignor already exists',
      );

      // Assert
      expect(prismaService.assignor.findUnique).toHaveBeenCalledWith({
        where: { document: '12345678901' },
      });
      expect(prismaService.assignor.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of assignors', async () => {
      // Act
      const result = await assignorService.findAll();

      // Assert
      expect(result).toEqual(assignorEntityList);
    });
  });

  describe('findOne', () => {
    it('should return an assignor', async () => {
      // Act
      const result = await assignorService.findOne('2');

      // Assert
      expect(result).toEqual(assignorEntityList[1]);
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      jest
        .spyOn(prismaService.assignor, 'findUniqueOrThrow')
        .mockRejectedValue(new Error('Assignor not found'));

      // Act
      await expect(assignorService.findOne('5')).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update an assignor', async () => {
      // Arrange
      const assignorUpdate = {
        email: 'teste2@gmail.com',
      };

      // Act
      const result = await assignorService.update('2', assignorUpdate);

      // Assert
      expect(result).toEqual(assignorEntityList[1]);
      expect(prismaService.assignor.update).toHaveBeenCalledWith({
        where: { id: '2' },
        data: assignorUpdate,
      });
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      const assignorUpdate = {
        email: 'teste2@gmail.com',
      };

      jest
        .spyOn(prismaService.assignor, 'update')
        .mockRejectedValue(new Error('Assignor not found'));

      // Act
      await expect(
        assignorService.update('5', assignorUpdate),
      ).rejects.toThrow();
    });

    it('should throw an error if assignor already exists', async () => {
      // Arrange
      const assignorUpdate = {
        document: '98765432109',
      };

      jest
        .spyOn(prismaService.assignor, 'update')
        .mockRejectedValue(new Error('Assignor already exists'));

      // Act
      await expect(
        assignorService.update('2', assignorUpdate),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove an assignor', async () => {
      // Act
      const result = await assignorService.remove('2');

      // Assert
      expect(result).toEqual({});
      expect(prismaService.assignor.delete).toHaveBeenCalledWith({
        where: { id: '2' },
      });
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      jest
        .spyOn(prismaService.assignor, 'delete')
        .mockRejectedValue(new Error('Assignor not found'));

      // Act
      await expect(assignorService.remove('5')).rejects.toThrow();
    });
  });
});
