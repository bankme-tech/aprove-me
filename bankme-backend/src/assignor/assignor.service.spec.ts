import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateAssignorDto, UpdateAssignorDto } from './dto/assignor.dto';
import { DbModule } from 'src/db/db.module';
import { AssignorRepository } from './assignor.repository';
import { AssignorService } from './assignor.service';

describe('AssignorService', () => {
  let service: AssignorService;
  let repository: AssignorRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [DbModule],
      providers: [AssignorService, AssignorRepository],
    }).compile();

    service = moduleRef.get<AssignorService>(AssignorService);
    repository = moduleRef.get<AssignorRepository>(AssignorRepository);
  });

  describe('getAssignorById', () => {
    test('should return an assignor if found', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(assignor);

      const result = await service.getAssignorById(assignor.id);

      expect(repository.findById).toHaveBeenCalledWith(assignor.id);
      expect(result).toEqual(assignor);
    });

    test('should throw NotFoundException if assignor not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(service.getAssignorById('any-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createAssignor', () => {
    test('should create and return an assignor', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      const dto: CreateAssignorDto = {
        document: assignor.document,
        email: assignor.email,
        name: assignor.name,
        phone: assignor.phone,
      };

      jest.spyOn(repository, 'create').mockResolvedValueOnce(assignor);

      const result = await service.createAssignor(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(assignor);
    });
  });

  describe('updateAssignor', () => {
    test('should update and return the assignor if found', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };
      const dto = {
        document: 'new-doc',
      };
      const updatedAssignor = {
        ...assignor,
        document: dto.document,
      };

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(assignor);

      jest.spyOn(repository, 'update').mockResolvedValueOnce({
        ...assignor,
        document: dto.document,
      });

      const result = await service.updateAssignor(assignor.id, dto);

      expect(repository.findById).toHaveBeenCalledWith(assignor.id);
      expect(repository.update).toHaveBeenCalledWith(assignor.id, dto);
      expect(result).toEqual(updatedAssignor);
    });

    test('should throw NotFoundException if assignor not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      const dto: UpdateAssignorDto = {
        document: 'new-doc',
        email: 'new-email',
        name: 'new-name',
        phone: 'new-phone',
      };
      await expect(service.updateAssignor('any-id', dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteAssignor', () => {
    test('should delete the assignor if found', async () => {
      const assignor = {
        id: 'any-id',
        document: 'any-doc',
        email: 'any-email',
        name: 'any-name',
        phone: 'any-phone',
      };

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(assignor);

      jest.spyOn(repository, 'delete').mockResolvedValueOnce(undefined);

      await expect(
        service.deleteAssignor(assignor.id),
      ).resolves.toBeUndefined();

      expect(repository.findById).toHaveBeenCalledWith(assignor.id);
      expect(repository.delete).toHaveBeenCalledWith(assignor.id);
    });

    test('should throw NotFoundException if assignor not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(service.deleteAssignor('any-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
