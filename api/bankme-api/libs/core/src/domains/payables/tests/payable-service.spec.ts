import { Test, TestingModule } from '@nestjs/testing';
import { PayableDomainService } from '../payable-service';
import { mock } from 'jest-mock-extended';
import { IPayableRepository } from '../interfaces/payable-repository.interface';
import { PayableRepository } from 'bme/core/infra/database/repositories/payable-repository';
import { IAssignorRepository } from '../../assignors/interfaces/assignor-repository.interface';
import { AssignorRepository } from 'bme/core/infra/database/repositories/assignor-repository';
import { PayableMocks } from './payable-mocks';
import { Fails } from 'bme/core/messages/fails';

describe('PayableDomainService', () => {
  let service: PayableDomainService;
  const payableRepositoryMock = mock<IPayableRepository>();
  const assignorRepositoryMock = mock<IAssignorRepository>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableDomainService,
        { provide: PayableRepository, useValue: payableRepositoryMock },
        { provide: AssignorRepository, useValue: assignorRepositoryMock },
      ],
    }).compile();

    service = module.get<PayableDomainService>(PayableDomainService);
  });

  describe('PayableDomainService.isValid()', () => {
    it('should be a invalid PayableVO: INVALID_ASSIGNOR', async () => {
      const payable = PayableMocks.getPayable();
      payable.assignorId = null;
      const vo = PayableMocks.convertToVO([payable])[0];

      const result = await service.validate(vo);
      expect(result).toStrictEqual([Fails.INVALID_ASSIGNOR]);
    });

    it('should be a valid PayableVO', async () => {
      const payable = PayableMocks.getPayable();
      const assignor = PayableMocks.getAssignor();

      assignorRepositoryMock.getById
        .calledWith(payable.assignorId)
        .mockReturnValue(Promise.resolve(assignor));

      const vo = PayableMocks.convertToVO([payable])[0];

      const result = await service.validate(vo);
      expect(assignorRepositoryMock.getById).toHaveBeenCalledWith(
        payable.assignorId,
      );
      expect(result).toStrictEqual([]);
    });
  });

  describe('PayableDomainService.getById()', () => {
    it('should call PayableRepository', () => {
      service.getById('id');
      expect(payableRepositoryMock.getById).toHaveBeenCalledWith('id');
    });

    it('should find a result by Id', async () => {
      const payable = PayableMocks.getPayable();
      payableRepositoryMock.getById
        .calledWith(payable.id)
        .mockReturnValue(Promise.resolve(payable));

      const result = await service.getById(payable.id);

      expect(result.id).toStrictEqual(payable.id);
      expect(result.value).toStrictEqual(payable.value);
      expect(result.emissionDate).toStrictEqual(payable.emissionDate);
      expect(result.assignorId).toStrictEqual(payable.assignorId);
      expect(result.createdAt).toStrictEqual(payable.createdAt);
      expect(result.updateAt).toStrictEqual(payable.updateAt);
    });

    it('should not find a result by Id', async () => {
      const payable = PayableMocks.getPayable();
      payableRepositoryMock.getById
        .calledWith(payable.id)
        .mockReturnValue(Promise.resolve(payable));

      const result = await service.getById('1');

      expect(result).toStrictEqual(null);
    });
  });

  describe('PayableDomainService.getAll()', () => {
    it('should call PayableRepository', () => {
      service.getAll();
      expect(payableRepositoryMock.getAll).toHaveBeenCalled();
    });
    it('should be a empty array', async () => {
      const result = await service.getAll();
      expect(result).toStrictEqual([]);
    });
    it('should be a array with items', async () => {
      const mockValues = PayableMocks.getAll();
      payableRepositoryMock.getAll.mockReturnValue(Promise.resolve(mockValues));

      const result = await service.getAll();

      expect(result.length).toStrictEqual(mockValues.length);
      expect(result).toStrictEqual(mockValues);
    });
  });
});
