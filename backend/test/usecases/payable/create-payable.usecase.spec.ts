import { Test, TestingModule } from '@nestjs/testing';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { CreatePayableUseCase } from 'src/payable/usecases/create-payable.usecase';
import { makePayableDTO } from '../../mocks/dtos.mock';
import { AssignorRepositoryStub } from '../../mocks/repositories/assignor.repository.mock';
import { PayableRepositoryStub } from '../../mocks/repositories/payable.repository.mock';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

describe('CreatePayableUseCase', () => {
  let sut: CreatePayableUseCase;
  let assignorRepositoryStub: AssignorRepositoryStub;
  let payableRepositoryStub: PayableRepositoryStub;
  let dto: CreatePayableInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePayableUseCase,
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
        {
          provide: IPayableRepository,
          useClass: PayableRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<CreatePayableUseCase>(CreatePayableUseCase);
    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);
    payableRepositoryStub =
      module.get<PayableRepositoryStub>(IPayableRepository);

    const { value, emissionDate, assignorId } = makePayableDTO();
    dto = {
      value,
      emissionDate,
      assignorId,
    };
  });

  test('should call assignorRepository with correct values', async () => {
    await sut.execute(dto);

    expect(assignorRepositoryStub.data).toBe(dto.assignorId);
  });

  test('should throw RecordNotFoundError if assignorRepository returns null', async () => {
    assignorRepositoryStub.response = null;

    const response = sut.execute(dto);

    await expect(response).rejects.toThrow(new RecordNotFoundError('Assignor'));
  });

  test('should call payableRepository with correct values', async () => {
    await sut.execute(dto);

    expect(payableRepositoryStub.data).toBe(dto);
  });

  test('should return a new payable', async () => {
    const response = await sut.execute(dto);

    expect(response).toStrictEqual(payableRepositoryStub.response);
  });
});
