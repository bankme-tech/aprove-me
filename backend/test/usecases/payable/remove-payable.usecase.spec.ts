import { Test, TestingModule } from '@nestjs/testing';
import { PayableRepositoryStub } from '../../mocks/repositories/payable.repository.mock';
import { IPayableRepository } from 'src/payable/repositories/payable.repository.interface';
import { makePayableDTO } from 'test/mocks/dtos.mock';
import { RemovePayableUseCase } from 'src/payable/usecases/remove-payable-usecase';
import { RemovePayableInputDTO } from 'src/payable/dto/remove-payable.input.dto';

describe('RemovePayableUseCase', () => {
  let sut: RemovePayableUseCase;
  let payableRepositoryStub: PayableRepositoryStub;
  let dto: RemovePayableInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePayableUseCase,
        {
          provide: IPayableRepository,
          useClass: PayableRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<RemovePayableUseCase>(RemovePayableUseCase);

    payableRepositoryStub =
      module.get<PayableRepositoryStub>(IPayableRepository);

    const { id } = makePayableDTO();
    dto = { id };
  });

  test('should call payableRepository with correct values', async () => {
    const removeSpy = jest.spyOn(payableRepositoryStub, 'remove');

    await sut.execute(dto);

    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
