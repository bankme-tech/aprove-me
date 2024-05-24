import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepositoryStub } from '../../mocks/repositories/payable.repository.mock';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { UpdatePayableUseCase } from 'src/payable/usecases/update-payable.usecase';
import { UpdatePayableInputDTO } from 'src/payable/dto/update-payable.input.dto';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { AssignorRepositoryStub } from 'test/mocks/repositories/assignor.repository.mock';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';

describe('UpdatePayableUseCase', () => {
  let sut: UpdatePayableUseCase;
  let payableRepositoryStub: PayableRepositoryStub;
  let assignorRepositoryStub: AssignorRepositoryStub;
  let dto: UpdatePayableInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePayableUseCase,
        {
          provide: IPayableRepository,
          useClass: PayableRepositoryStub,
        },
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<UpdatePayableUseCase>(UpdatePayableUseCase);

    payableRepositoryStub =
      module.get<PayableRepositoryStub>(IPayableRepository);

    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);

    const { id } = makePayableEntity();
    dto = { id };
  });

  test('should call assignorRepository with correct values', async () => {
    const updateSpy = jest.spyOn(assignorRepositoryStub, 'findById');

    await sut.execute(dto);

    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  test('should throw RecordNotFoundError if no assignor is found', async () => {
    assignorRepositoryStub.response = null;

    const promise = sut.execute(dto);

    await expect(promise).rejects.toThrow(new RecordNotFoundError('Assignor'));
  });

  test('should call payableRepository with correct values', async () => {
    const updateSpy = jest.spyOn(payableRepositoryStub, 'update');

    await sut.execute(dto);

    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  test('should return a payable', async () => {
    const response = await sut.execute(dto);

    expect(response).toStrictEqual(payableRepositoryStub.response);
  });
});
