import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from '../db/prisma.service';
import { Payable } from './entities/payable.entity';
import { Assignor } from '../assignor/entities/assignor.entity';
import { BadRequestException } from '@nestjs/common';

const payableEntityList = [
  new Payable({
    id: '1',
    value: 100,
    emissionDate: new Date(),
    assignorId: '123e4567-e89b-12d3-a456-426614174000',
  }),
  new Payable({
    id: '2',
    value: 200,
    emissionDate: new Date(),
    assignorId: '2',
  }),
  new Payable({
    id: '3',
    value: 300,
    emissionDate: new Date(),
    assignorId: '3',
  }),
  new Payable({
    id: '4',
    value: 400,
    emissionDate: new Date(),
    assignorId: '2',
  }),
];

const assignorEntity = new Assignor(
  '123e4567-e89b-12d3-a456-426614174000',
  '12345678901',
  'teste@teste.com',
  '31999999999',
  'Assignor 1',
);

describe('PayableService', () => {
  let payableService: PayableService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PrismaService,
          useValue: {
            payable: {
              findMany: jest.fn().mockResolvedValue(payableEntityList),
              create: jest.fn().mockResolvedValue(payableEntityList[0]),
              findUnique: jest.fn().mockResolvedValue(payableEntityList[1]),
              update: jest.fn().mockResolvedValue(payableEntityList[2]),
              delete: jest.fn().mockResolvedValue({}),
            },
            assignor: {
              findUnique: jest.fn().mockResolvedValue(assignorEntity),
            },
          },
        },
      ],
    }).compile();

    payableService = module.get<PayableService>(PayableService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findAll', () => {
    it('should return an array of payables', async () => {
      // Act
      const result = await payableService.findAll();

      // Assert
      expect(result).toEqual(payableEntityList);
    });
  });

  describe('create', () => {
    it('should create a payable', async () => {
      // Arrange
      const payableInsert = {
        data: {
          value: 100,
          assignor: '123e4567-e89b-12d3-a456-426614174000',
        },
      };

      // Act
      const result = await prismaService.payable.create(payableInsert);

      // Assert
      expect(result).toEqual(payableEntityList[0]);
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      const payableInsert = {
        data: {
          value: 100,
          assignor: '123e4567-e89b-12d3-a456-4266141740500',
        },
      };
      jest
        .spyOn(prismaService.assignor, 'findUnique')
        .mockRejectedValueOnce(new BadRequestException('Assignor not found'));

      // Act
      try {
        await payableService.create(payableInsert as unknown as any);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Bad Request Exception');
      }
    });

    it('should throw an error if validation fails', async () => {
      // Arrange
      const payableInsert = {
        value: '100',
        assignor: '1',
      };

      // Act
      try {
        await payableService.create(payableInsert as unknown as any);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Bad Request Exception');
        expect(error.response.message).toEqual([
          'value has wrong value 100, value must be a number conforming to the specified constraints',
          'assignor has wrong value 1, assignor must be a UUID',
        ]);
      }
    });
  });

  describe('findOne', () => {
    it('should return a payable', async () => {
      // Act
      const result = await payableService.findOne('2');

      // Assert
      expect(result).toEqual(payableEntityList[1]);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      const id = '5';
      jest
        .spyOn(prismaService.payable, 'findUnique')
        .mockRejectedValueOnce(new BadRequestException('Payable not found'));

      // Act
      try {
        await payableService.findOne(id);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Payable not found');
      }
    });
  });

  describe('update', () => {
    it('should update a payable', async () => {
      // Arrange
      const id = '3';
      const payableUpdate = {
        value: 300,
        assignor: '3',
      };

      // Act
      const result = await payableService.update(id, payableUpdate);

      // Assert
      expect(result).toEqual(payableEntityList[2]);
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      const id = '5';
      const payableUpdate = {
        value: 300,
        assignor: '3',
      };
      jest
        .spyOn(prismaService.payable, 'update')
        .mockRejectedValueOnce(new BadRequestException('Payable not found'));

      // Act
      try {
        await payableService.update(id, payableUpdate);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Payable not found');
      }
    });

    it('should throw an error if assignor does not exist', async () => {
      // Arrange
      const id = '3';
      const payableUpdate = {
        value: 300,
        assignor: '123e4567-e89b-12d3-a456-426614174500',
      };
      jest
        .spyOn(prismaService.assignor, 'findUnique')
        .mockRejectedValueOnce(new BadRequestException('Assignor not found'));

      // Act
      try {
        await payableService.update(id, payableUpdate);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Assignor not found');
      }
    });
  });

  describe('remove', () => {
    it('should remove a payable', async () => {
      // Arrange
      const id = '4';

      // Act
      const result = await payableService.remove(id);

      // Assert
      expect(result).toEqual({});
    });

    it('should throw an error if payable does not exist', async () => {
      // Arrange
      const id = '5';
      jest
        .spyOn(prismaService.payable, 'delete')
        .mockRejectedValueOnce(new BadRequestException('Payable not found'));

      // Act
      try {
        await payableService.remove(id);
      } catch (error) {
        // Assert
        expect(error.message).toBe('Payable not found');
      }
    });
  });
});
