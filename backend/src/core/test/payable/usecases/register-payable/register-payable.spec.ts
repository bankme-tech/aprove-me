import { NotFoundException } from '@nestjs/common';
import { Payable } from '@core/payable/model';
import { Assignor } from '@core/assignor/model';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { PayableRepository } from '@core/payable/ports/repository';
import { RegisterPayableUseCase } from '@core/payable/usecases/register-payable';
import { Test, TestingModule } from '@nestjs/testing';
import {
  AssignorDataBuilder,
  PayableDataBuilder,
} from '@core/test/__mocks__/data-builder';

describe('RegisterPayableUseCaseUseCase', () => {
  let sut: RegisterPayableUseCase;
  let payableRepository: PayableRepository;
  let assignorRepository: AssignorRepository;

  const props = AssignorDataBuilder.anAssignor().build();
  const assignor = Assignor.create(props);

  const input = PayableDataBuilder.aPayable().build();
  const payable = Payable.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const PayableRepositoryProvider = {
      provide: PayableRepository,
      useValue: {
        save: jest.fn().mockResolvedValue(0),
      },
    };

    const AssignorRepositoryProvider = {
      provide: AssignorRepository,
      useValue: {
        findById: jest.fn().mockResolvedValue(assignor),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterPayableUseCase,
        PayableRepositoryProvider,
        AssignorRepositoryProvider,
      ],
    }).compile();

    sut = app.get<RegisterPayableUseCase>(RegisterPayableUseCase);
    payableRepository = app.get<PayableRepository>(PayableRepository);
    assignorRepository = app.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(payableRepository).toBeDefined();
    expect(assignorRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call the assignorRepository find by id with correct values', async () => {
      await sut.execute(input);

      expect(assignorRepository.findById).toHaveBeenCalledTimes(1);
      expect(assignorRepository.findById).toHaveBeenCalledWith(input.assignor);
    });

    it('should throw not found exception if his payable can only be created for an existing assignor', async () => {
      jest.spyOn(assignorRepository, 'findById').mockResolvedValueOnce(null);

      const input = PayableDataBuilder.aPayable().withValue(1005).build();

      await expect(sut.execute(input)).rejects.toThrow(NotFoundException);
    });

    it('should return notifications if assignor data is invalid', async () => {
      const input = PayableDataBuilder.aPayable().withAssignor('').build();

      const output = await sut.execute(input);

      expect(output).toBeDefined();
      expect(output.notifications).toBeDefined();
    });

    it('should not call the repository save method if data is invalid', async () => {
      const input = PayableDataBuilder.aPayable().withValue(1005).build();

      await sut.execute(input);

      expect(payableRepository.save).not.toHaveBeenCalled();
    });

    it('should call the repository save method if data is valid', async () => {
      await sut.execute(input);

      expect(payableRepository.save).toHaveBeenCalledTimes(1);
      expect(payableRepository.save).toHaveBeenCalledWith(expect.any(Payable));
    });

    it('should register a new payable with valid data', async () => {
      const output = await sut.execute(input);

      expect(output.id).toBeDefined();
      expect(output.value).toBe(payable.value);
      expect(output.assignor).toBe(payable.assignor);
      expect(output.notifications).toEqual({});
    });
  });
});
