import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor/controllers/assignor.controller';
import { AssignorService } from './assignor/service/assignor.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('AssignorController', () => {
  let assignorController: AssignorController;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService],
    }).compile();

    assignorController = module.get<AssignorController>(AssignorController);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  describe('createAssignor', () => {
    it('should create an assignor', async () => {
      const assignorDto = {
        document: '1234567890',
        email: 'example@example.com',
        phone: '123456789',
        name: 'John Doe',
      };

      const createdAssignor = {
        id: 1,
        ...assignorDto,
      };

      jest
        .spyOn(assignorService, 'createAssignor')
        .mockResolvedValue(createdAssignor);

      const result = await assignorController.createAssignor(assignorDto);

      expect(result).toEqual(createdAssignor);
    });

    it('should throw BadRequestException if assignor creation fails', async () => {
      const assignorDto = {
        document: '1234567890',
        email: 'example@example.com',
        phone: '123456789',
        name: 'John Doe',
      };

      jest
        .spyOn(assignorService, 'createAssignor')
        .mockRejectedValue(new Error());

      await expect(
        assignorController.createAssignor(assignorDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAssignorById', () => {
    it('should return an assignor by ID', async () => {
      const assignorId = '1';
      const assignor = {
        id: 1,
        document: '1234567890',
        email: 'example@example.com',
        phone: '123456789',
        name: 'John Doe',
      };

      jest
        .spyOn(assignorService, 'getAssignorById')
        .mockResolvedValue(assignor);

      const result = await assignorController.getAssignorById(assignorId);

      expect(result).toEqual(assignor);
    });

    it('should throw NotFoundException if assignor is not found', async () => {
      const assignorId = '1';

      jest.spyOn(assignorService, 'getAssignorById').mockResolvedValue(null);

      await expect(
        assignorController.getAssignorById(assignorId),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAssignor', () => {
    it('should update an assignor', async () => {
      const assignorId = '1';
      const assignorDto = {
        document: '1234567890',
        email: 'example@example.com',
        phone: '123456789',
        name: 'John Doe',
      };

      const updatedAssignor = {
        id: 1,
        ...assignorDto,
      };

      jest
        .spyOn(assignorService, 'updateAssignor')
        .mockResolvedValue(updatedAssignor);

      const result = await assignorController.updateAssignor(
        assignorId,
        assignorDto,
      );

      expect(result).toEqual(updatedAssignor);
    });

    it('should throw BadRequestException if assignor is not found', async () => {
      const assignorId = '1';
      const assignorDto = {
        document: '1234567890',
        email: 'example@example.com',
        phone: '123456789',
        name: 'John Doe',
      };

      jest.spyOn(assignorService, 'updateAssignor').mockResolvedValue(null);

      await expect(
        assignorController.updateAssignor(assignorId, assignorDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if assignor update fails', async () => {
      const assignorId = '1';
      const assignorDto = {
        document: '1234567890',
        email: 'example@example.com',
        phone: '123456789',
        name: 'John Doe',
      };

      jest
        .spyOn(assignorService, 'updateAssignor')
        .mockRejectedValue(new Error());

      await expect(
        assignorController.updateAssignor(assignorId, assignorDto),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteAssignor', () => {
    it('should delete an assignor', async () => {
      const assignorId = '1';

      jest
        .spyOn(assignorService, 'deleteAssignor')
        .mockResolvedValue({} as any);

      await assignorController.deleteAssignor(assignorId);

      expect(assignorService.deleteAssignor).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if assignor is not found', async () => {
      const assignorId = '1';

      jest.spyOn(assignorService, 'deleteAssignor').mockResolvedValue(null);

      await expect(
        assignorController.deleteAssignor(assignorId),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
