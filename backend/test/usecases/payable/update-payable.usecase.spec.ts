import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepositoryStub } from '../../mocks/repositories/payable.repository.mock';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { UpdatePayableUseCase } from 'src/payable/usecases/update-payable.usecase';
import { UpdatePayableInputDTO } from 'src/payable/dto/update-payable.input.dto';
import { makePayableEntity } from 'test/mocks/entities/payable.entity.mock';

describe('UpdatePayableUseCase', () => {
  let sut: UpdatePayableUseCase;
  let payableRepositoryStub: PayableRepositoryStub;
  let dto: UpdatePayableInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePayableUseCase,
        {
          provide: IPayableRepository,
          useClass: PayableRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<UpdatePayableUseCase>(UpdatePayableUseCase);

    payableRepositoryStub =
      module.get<PayableRepositoryStub>(IPayableRepository);

    const { id } = makePayableEntity();
    dto = { id };
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
