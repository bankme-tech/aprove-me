import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreatePayableDto, UpdatePayableDto } from './dto/payable.dto';
import { PayableRepository } from './payable.repository';
import { AssignorService } from 'src/assignor/assignor.service';
import { PayableService } from './payable.service';

describe('PayableService', () => {
  let service: PayableService;
  let repository: PayableRepository;
  let assignorService: AssignorService;

  const mockAssignorService = {
    getAssignorById: jest.fn(),
  };

  const mockRepository = {
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: mockRepository,
        },
        {
          provide: AssignorService,
          useValue: mockAssignorService,
        },
      ],
    }).compile();

    repository = moduleRef.get<PayableRepository>(PayableRepository);
    assignorService = moduleRef.get<AssignorService>(AssignorService);
    service = moduleRef.get<PayableService>(PayableService);
  });

  describe('getPayableById', () => {
    test('should return an payable by id', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(payable);

      const result = await service.getPayableById(payable.id);

      expect(repository.findById).toHaveBeenCalledWith(payable.id);
      expect(result).toEqual(payable);
    });

    test('should throw NotFoundException if assignor not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(service.getPayableById('any-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createPayable', () => {
    test('should create and return an payable', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      const dto: CreatePayableDto = {
        assignorId: payable.assignorId,
        emissionDate: payable.emissionDate,
        value: payable.value,
      };

      jest.spyOn(assignorService, 'getAssignorById').mockResolvedValueOnce({
        id: payable.assignorId,
        name: 'any-name',
        document: 'any-doc',
        email: 'any-email',
        phone: 'any-phone',
      });
      jest.spyOn(repository, 'create').mockResolvedValueOnce(payable);

      const result = await service.createPayable(dto);

      expect(assignorService.getAssignorById).toHaveBeenCalledWith(
        dto.assignorId,
      );
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(payable);
    });
  });

  describe('updatePayable', () => {
    test('should update and return the payable if found', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      const dto: UpdatePayableDto = {
        assignorId: payable.assignorId,
        emissionDate: payable.emissionDate,
        value: payable.value,
      };

      jest.spyOn(assignorService, 'getAssignorById').mockResolvedValueOnce({
        id: payable.assignorId,
        phone: 'any-phone',
        name: 'any-name',
        document: 'any-doc',
        email: 'any-email',
      });
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(payable);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(payable);

      const result = await service.updatePayable(payable.id, dto);

      expect(assignorService.getAssignorById).toHaveBeenCalledWith(
        payable.assignorId,
      );
      expect(repository.findById).toHaveBeenCalledWith(payable.id);
      expect(repository.update).toHaveBeenCalledWith(payable.id, dto);
      expect(result).toEqual(payable);
    });

    test('should throw NotFoundException if assignor not found', async () => {
      jest
        .spyOn(mockAssignorService, 'getAssignorById')
        .mockResolvedValueOnce(null);

      const dto: UpdatePayableDto = {
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      await expect(service.updatePayable('any-id', dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(assignorService.getAssignorById).toHaveBeenCalledWith(
        dto.assignorId,
      );
    });

    test('should throw NotFoundException if payable not found', async () => {
      const dto: UpdatePayableDto = {
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      jest.spyOn(assignorService, 'getAssignorById').mockResolvedValueOnce({
        id: dto.assignorId!,
        phone: 'any-phone',
        name: 'any-name',
        document: 'any-doc',
        email: 'any-email',
      });
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(service.updatePayable('any-id', dto)).rejects.toThrow(
        NotFoundException,
      );
      expect(assignorService.getAssignorById).toHaveBeenCalledWith(
        dto.assignorId,
      );
      expect(repository.findById).toHaveBeenCalledWith(dto.assignorId);
    });
  });

  describe('deletePayable', () => {
    test('should delete the payable if found', async () => {
      const payable = {
        id: 'any-id',
        assignorId: 'any-id',
        emissionDate: new Date(),
        value: 10,
      };

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(payable);
      jest.spyOn(repository, 'delete').mockResolvedValueOnce(undefined);

      await expect(service.deletePayable(payable.id)).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(payable.id);
    });

    test('should throw NotFoundException if payable not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      await expect(service.deletePayable('any-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
