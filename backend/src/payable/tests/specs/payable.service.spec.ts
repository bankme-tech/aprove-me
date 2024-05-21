import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from '../../payable.service';
import PayableRepository from '../../repositories/payable.repository';
import { payableRepositoryMock } from '../mocks/payable-repository.mock';
import { assignorRepositoryMock } from '../mocks/assignor-repository.mock';
import AssignorRepository from '../../../assignor/repositories/assignor.repository';
import { createPayableExamples } from '../examples/create-payable';
import { NotFoundException } from '@nestjs/common';
import { payable } from '../examples/payable-examples';

describe('PayableService', () => {
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        {
          provide: PayableRepository,
          useValue: payableRepositoryMock,
        },
        {
          provide: AssignorRepository,
          useValue: assignorRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payable and return it', async () => {
      const payable = await service.create(createPayableExamples.valid);
      expect(payable.id).toBeDefined();
      expect(payable.assignorId).toBe(createPayableExamples.valid.assignorId);
      expect(payable.value).toBe(createPayableExamples.valid.value);
    });

    it('should throw NotFoundException if assignor is not found', async () => {
      jest.spyOn(assignorRepositoryMock, 'findOne').mockResolvedValue(null);
      await expect(
        service.create(createPayableExamples.notFound),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all payables', async () => {
      const payables = await service.findAll();
      expect(payables).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a payable', async () => {
      const payable = await service.findOne('payable1');
      expect(payable.id).toBeDefined();
    });

    it('should throw NotFoundException if payable is not found', async () => {
      jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('not-found')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a payable and return it', async () => {
      jest
        .spyOn(payableRepositoryMock, 'findOne')
        .mockResolvedValue(payable.payable1);
      const result = await service.update(
        'payable1',
        createPayableExamples.update,
      );
      expect(result.id).toBeDefined();
      expect(result.assignorId).toBe(createPayableExamples.update.assignorId);
      expect(result.value).toBe(createPayableExamples.update.value);
    });

    it('should throw NotFoundException if payable is not found', async () => {
      jest.spyOn(payableRepositoryMock, 'findOne').mockResolvedValue(null);
      await expect(
        service.update('not-found', createPayableExamples.update),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a payable', async () => {
      const result = await service.remove('payable1');
      expect(result).toBeUndefined();
    });
  });
});
