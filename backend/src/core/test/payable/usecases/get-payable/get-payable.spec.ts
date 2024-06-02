import { Payable } from '@core/payable/model';
import { PayableRepository } from '@core/payable/ports/repository';
import { GetPayableUseCase } from '@core/payable/usecases';
import { PayableDataBuilder } from '@core/test/__mocks__/data-builder';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetPayableUseCase', () => {
  let sut: GetPayableUseCase;
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
      providers: [GetPayableUseCase, PayableRepositoryProvider],
    }).compile();

    sut = app.get<GetPayableUseCase>(GetPayableUseCase);
    payableRepository = app.get<PayableRepository>(PayableRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(payableRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if payable does not exist', async () => {
      jest.spyOn(payableRepository, 'findById').mockResolvedValueOnce(null);

      await expect(sut.execute(id)).rejects.toThrow(NotFoundException);
    });

    it('should return the payable if it exists', async () => {
      const result = await sut.execute(id);

      expect(result).toStrictEqual(payable);
    });
  });
});
