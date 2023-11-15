import { mock } from 'jest-mock-extended';

import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from '../assignor.controller';
import { IAssignorService } from '../interfaces/assignor-service.interface';
import { AssignorService } from '../assignor.service';
import { createAssignorMock } from './mock/create-assignor.mock';

describe('AssignorController', () => {
  let controller: AssignorController;
  const assignorServiceMock = mock<IAssignorService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [
        {
          provide: AssignorService,
          useValue: assignorServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
  });

  describe('findAll()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ACT
      controller.findAll();

      // ASSERT
      expect(assignorServiceMock.findAll).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ACT
      controller.findById('id');

      // ASSERT
      expect(assignorServiceMock.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('create()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ARRANGE
      const assignor = createAssignorMock;

      // ACT
      controller.create(assignor);

      // ASSERT
      expect(assignorServiceMock.create).toHaveBeenCalledWith(assignor);
    });
  });

  describe('update()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ARRANGE
      const assignor = {};

      // ACT
      controller.update('id', assignor);

      // ASSERT
      expect(assignorServiceMock.update).toHaveBeenCalledWith('id', assignor);
    });
  });

  describe('delete()', () => {
    it('should call AssignorService with success and correct params', () => {
      // ACT
      controller.delete('id');

      // ASSERT
      expect(assignorServiceMock.delete).toHaveBeenCalledWith('id');
    });
  });
});
