import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepositoryStub } from '../../mocks/repositories/payable.repository.mock';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { FindAllPayablesUseCase } from 'src/payable/usecases/find-all-payables.usecase';

describe('FindAllPayablesUseCase', () => {
  let sut: FindAllPayablesUseCase;
  let payableRepositoryStub: PayableRepositoryStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllPayablesUseCase,
        {
          provide: IPayableRepository,
          useClass: PayableRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<FindAllPayablesUseCase>(FindAllPayablesUseCase);

    payableRepositoryStub =
      module.get<PayableRepositoryStub>(IPayableRepository);
  });

  test('should call payableRepository with correct values', async () => {
    const findAllSpy = jest.spyOn(payableRepositoryStub, 'findAll');

    await sut.execute();

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  test('should return a list of payables', async () => {
    const response = await sut.execute();

    expect(response).toStrictEqual([payableRepositoryStub.response]);
  });
});
