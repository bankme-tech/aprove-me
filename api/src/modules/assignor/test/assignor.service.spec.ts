import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from '../assignor.service';
import { IAssignorRepository } from '../interfaces/assignor.repository.interface';
import { mock } from 'jest-mock-extended';
import { AssignorRepository } from '../../../infra/database/prisma/assignor.repository';
import { createAssignorMock } from './mock/create-assignor.mock';
import { randomUUID } from 'crypto';
import { IAssignor } from '../interfaces/assignor.interface';

describe('AssignorService', () => {
  let service: AssignorService;
  const assignorRepositoryMock = mock<IAssignorRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignorService,
        { provide: AssignorRepository, useValue: assignorRepositoryMock },
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  describe('findAll()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ACT
      service.findAll();

      // ASSERT
      expect(assignorRepositoryMock.findAll).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ARRANGE
      const id = randomUUID();

      // ACT
      service.findById(id);

      // ASSERT
      expect(assignorRepositoryMock.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('create()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ACT
      service.create(createAssignorMock);

      // ASSERT
      expect(assignorRepositoryMock.create).toHaveBeenCalledWith({
        id: expect.any(String),
        ...createAssignorMock,
      });
    });
  });

  describe('update()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ARRANGE
      const assignor: Partial<IAssignor> = { document: 'other document' };

      // ACT
      service.update('id', assignor);

      // ASSERT
      expect(assignorRepositoryMock.update).toHaveBeenCalledWith({
        id: 'id',
        ...assignor,
      });
    });
  });

  describe('delete()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ACT
      service.delete('id');

      // ASSERT
      expect(assignorRepositoryMock.delete).toHaveBeenCalledWith('id');
    });
  });
});
