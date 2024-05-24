import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepositoryStub } from '../../mocks/repositories/payable.repository.mock';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { FindPayableUseCase } from 'src/payable/usecases/find-payable.usecase';
import { FindPayableInputDTO } from 'src/payable/dto/find-payable.input.dto';
import { makePayableDTO } from 'test/mocks/dtos.mock';

describe('FindPayableUseCase', () => {
  let sut: FindPayableUseCase;
  let payableRepositoryStub: PayableRepositoryStub;
  let dto: FindPayableInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPayableUseCase,
        {
          provide: IPayableRepository,
          useClass: PayableRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<FindPayableUseCase>(FindPayableUseCase);

    payableRepositoryStub =
      module.get<PayableRepositoryStub>(IPayableRepository);

    const { id } = makePayableDTO();
    dto = { id };
  });

  test('should call payableRepository with correct values', async () => {
    const findByIdSpy = jest.spyOn(payableRepositoryStub, 'findById');

    await sut.execute(dto);

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
  });

  test('should return a payable', async () => {
    const response = await sut.execute(dto);

    expect(response).toStrictEqual(payableRepositoryStub.response);
  });
});
