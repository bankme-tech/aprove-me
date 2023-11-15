import { TestingModule, Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { DeepMockProxy, mock, mockDeep } from 'jest-mock-extended';
import { IAssignor } from '../../../../modules/assignor/interfaces/assignor.interface';
import { createAssignorMock } from '../../../../modules/assignor/test/mock/create-assignor.mock';
import { AssignorRepository } from '../assignor.repository';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
import { PrismaServiceMock } from './mock/prisma-service.mock';

describe('AssignorRepository', () => {
  let repository: AssignorRepository;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorRepository,
        { provide: PrismaService, useClass: PrismaServiceMock },
      ],
    }).compile();

    prismaServiceMock = module.get<PrismaService>(PrismaService);
    repository = module.get<AssignorRepository>(AssignorRepository);
  });

  describe('create', () => {
    it('should call PrismaService with success and correct params', () => {
      // ARRANGE
      const assignor = { id: randomUUID(), ...createAssignorMock };

      // ACT
      repository.create(assignor);

      // ASSERT
      expect(prismaServiceMock.assignor.create).toHaveBeenCalledWith({
        data: assignor,
      });
      expect(prismaServiceMock.assignor.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call PrismaService with success', () => {
      // ACT
      repository.findAll();

      // ASSERT
      expect(prismaServiceMock.assignor.findMany).toHaveBeenCalled();
      expect(prismaServiceMock.assignor.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should call PrismaService with success and correct params', () => {
      // ACT
      repository.findById('any id');

      // ASSERT
      expect(prismaServiceMock.assignor.findUnique).toHaveBeenCalledWith({
        where: { id: 'any id' },
      });
      expect(prismaServiceMock.assignor.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call PrismaService with success and correct params', () => {
      // ARRANGE
      const assignor = { id: randomUUID(), ...createAssignorMock };

      // ACT
      repository.update(assignor);

      // ASSERT
      expect(prismaServiceMock.assignor.update).toHaveBeenCalledWith({
        where: { id: assignor.id },
        data: assignor,
      });
      expect(prismaServiceMock.assignor.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should call PrismaService with success and correct params', () => {
      // ACT
      repository.delete('any id');

      // ASSERT
      expect(prismaServiceMock.assignor.delete).toHaveBeenCalledWith({
        where: { id: 'any id' },
      });
      expect(prismaServiceMock.assignor.delete).toHaveBeenCalledTimes(1);
    });
  });
});
