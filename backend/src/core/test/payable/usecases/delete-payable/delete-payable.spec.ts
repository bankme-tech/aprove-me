import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Payable } from '@core/payable/model';
import { DeletePayableUseCase } from '@core/payable/usecases';
import { PayableRepository } from '@core/payable/ports/repository';
import { PayableDataBuilder } from '@core/test/__mocks__/data-builder';

describe('DeletePayableUseCaseUseCase', () => {
  let sut: DeletePayableUseCase;
  let payableRepository: PayableRepository;

  const id = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
  const input = PayableDataBuilder.aPayable().build();
  const payable = Payable.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const PayableRepositoryProvider = {
      provide: PayableRepository,
      useValue: {
        findById: jest.fn().mockResolvedValue(payable),
        delete: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [DeletePayableUseCase, PayableRepositoryProvider],
    }).compile();

    sut = app.get<DeletePayableUseCase>(DeletePayableUseCase);
    payableRepository = app.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(payableRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call payableRepository find by id with correct values', async () => {
      await sut.execute(id);

      expect(payableRepository.findById).toHaveBeenCalledTimes(1);
      expect(payableRepository.findById).toHaveBeenCalledWith(id);
    });

    it('should return an exception if payable not found', async () => {
      jest.spyOn(payableRepository, 'findById').mockResolvedValueOnce(null);

      await expect(sut.execute(id)).rejects.toThrow(NotFoundException);
    });

    it('should call the repository delete method if assignor exists', async () => {
      await sut.execute(id);

      expect(payableRepository.delete).toHaveBeenCalledTimes(1);
      expect(payableRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
