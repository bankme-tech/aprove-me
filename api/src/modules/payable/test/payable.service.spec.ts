import { TestingModule, Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { PayableRepository } from '../../../infra/database/prisma/payable.repository';
import { IPayableRepository } from '../interfaces/payable.repository.interface';
import { PayableService } from '../payable.service';
import { createPayableMock } from './mock/create-payable.mock';
import { Queue } from 'bull';

describe('PayableService', () => {
  let service: PayableService;
  const payableRepositoryMock = mock<IPayableRepository>();
  const queueMock = mock<Queue>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        { provide: PayableRepository, useValue: payableRepositoryMock },
        { provide: 'BullQueue_create_payable', useValue: queueMock },
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
  });

  describe('findAll()', () => {
    it('should call PayableRepository with success and correct params', () => {
      // ACT
      service.findAll();

      // ASSERT
      expect(payableRepositoryMock.findAll).toHaveBeenCalled();
    });
  });

  describe('findById()', () => {
    it('should call PayableRepository with success and correct params', () => {
      // ACT
      service.findById('id');

      // ASSERT
      expect(payableRepositoryMock.findById).toHaveBeenCalledWith('id');
    });
  });

  describe('create()', () => {
    it('should call PayableRepository with success and correct params', () => {
      // ARRANGE
      const payable = createPayableMock;

      // ACT
      service.create(payable);

      // ASSERT
      expect(payableRepositoryMock.create).toHaveBeenCalledWith({
        id: payable.id,
        value: payable.value,
        emissionDate: new Date(payable.emissionDate),
        assignorId: payable.assignor,
      });
    });
  });

  describe('update()', () => {
    it('should call PayableRepository with success and correct params', () => {
      // ARRANGE
      const payable = createPayableMock;

      // ACT
      service.update('id', payable);

      // ASSERT
      expect(payableRepositoryMock.update).toHaveBeenCalledWith({
        id: 'id',
        ...payable,
      });
    });
  });

  describe('delete()', () => {
    it('should call PayableRepository with success and correct params', () => {
      // ACT
      service.delete('id');

      // ASSERT
      expect(payableRepositoryMock.delete).toHaveBeenCalledWith('id');
    });
  });

  describe('batch', () => {
    it('should call PayableProcessor with success and correct params', () => {
      // ARRANGE
      const payables = [createPayableMock];

      // ACT
      service.batch(payables);

      // ASSERT
      expect(queueMock.add).toHaveBeenCalledWith('payables', [
        createPayableMock,
      ]);
    });
  });
});
