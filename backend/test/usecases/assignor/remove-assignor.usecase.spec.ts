import { Test, TestingModule } from '@nestjs/testing';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { makeAssignorEntity } from '../../mocks/entities/assignor.entity.mock';
import { AssignorRepositoryStub } from '../../mocks/repositories/assignor.repository.mock';
import { RemoveAssignorUseCase } from 'src/assignor/usecases/remove-assignor-usecase';
import { RemoveAssignorInputDTO } from 'src/assignor/dto/remove-assignor.input.dto';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

describe('RemoveAssignorUseCase', () => {
  let sut: RemoveAssignorUseCase;
  let assignorRepositoryStub: AssignorRepositoryStub;
  let dto: RemoveAssignorInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveAssignorUseCase,
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<RemoveAssignorUseCase>(RemoveAssignorUseCase);
    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);

    const { id } = makeAssignorEntity();
    dto = {
      id,
    };
  });

  test('should call assignorRepository with correct value', async () => {
    const removeSpy = jest.spyOn(assignorRepositoryStub, 'remove');

    await sut.execute(dto);

    expect(removeSpy).toHaveBeenCalledTimes(1);
  });

  test('should throw if no assignor is found', async () => {
    jest.spyOn(assignorRepositoryStub, 'findById').mockResolvedValue(null);

    const promise = sut.execute(dto);

    await expect(promise).rejects.toThrow(new RecordNotFoundError('Assignor'));
  });
});
