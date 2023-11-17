import { TestingModule, Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaServiceMock } from './mock/prisma-service.mock';
import { PayableRepository } from '../payable.repository';
import { IPayable } from 'src/modules/payable/interfaces/payable.interface';

describe('PayableRepository', () => {
  let repository: PayableRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableRepository,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    prismaServiceMock = module.get<PrismaService>(PrismaService);
    repository = module.get<PayableRepository>(PayableRepository);
  });

  describe('create', () => {
    it('should call PrismaService with success and correct params', () => {
      // ARRANGE
      const payable: IPayable = {
        id: randomUUID(),
        value: 100,
        emissionDate: new Date(),
        assignorId: randomUUID(),
      };

      // ACT
      repository.create(payable);

      // ASSERT
      expect(prismaServiceMock.payable.create).toHaveBeenCalledWith({
        data: payable,
      });
      expect(prismaServiceMock.payable.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call PrismaService with success', () => {
      // ACT
      repository.findAll();

      // ASSERT
      expect(prismaServiceMock.payable.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should call PrismaService with success and correct params', () => {
      // ACT
      repository.findById('any id');

      // ASSERT
      expect(prismaServiceMock.payable.findUnique).toHaveBeenCalledWith({
        where: { id: 'any id' },
      });
      expect(prismaServiceMock.payable.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call PrismaService with success and correct params', () => {
      // ARRANGE
      const payable = { id: randomUUID(), value: 123 };

      // ACT
      repository.update(payable);

      // ASSERT
      expect(prismaServiceMock.payable.update).toHaveBeenCalledWith({
        where: { id: payable.id },
        data: payable,
      });
      expect(prismaServiceMock.payable.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should call PrismaService with success and correct params', () => {
      // ACT
      repository.delete('any id');

      // ASSERT
      expect(prismaServiceMock.payable.delete).toHaveBeenCalledWith({
        where: { id: 'any id' },
      });
      expect(prismaServiceMock.payable.delete).toHaveBeenCalledTimes(1);
    });
  });
});
