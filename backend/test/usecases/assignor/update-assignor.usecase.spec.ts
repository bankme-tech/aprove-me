import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepositoryStub } from '../../mocks/repositories/assignor.repository.mock';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { UpdateAssignorUseCase } from 'src/assignor/usecases/update-assignor.usecase';
import { UpdateAssignorInputDTO } from 'src/assignor/dto/update-assignor.input.dto';
import { makeAssignorEntity } from 'test/mocks/entities/assignor.entity.mock';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

describe('UpdateAssignorUseCase', () => {
  let sut: UpdateAssignorUseCase;
  let assignorRepositoryStub: AssignorRepositoryStub;
  let dto: UpdateAssignorInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateAssignorUseCase,
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<UpdateAssignorUseCase>(UpdateAssignorUseCase);
    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);

    const { id, document, email, name, phone } = makeAssignorEntity();
    dto = {
      id,
      document,
      email,
      name,
      phone,
    };
  });

  test('should call assignorRepository with correct values', async () => {
    await sut.execute(dto);

    expect(assignorRepositoryStub.data).toEqual(dto);
  });

  test('should throw if no assignor is found', async () => {
    assignorRepositoryStub.response = null;

    const promise = sut.execute(dto);

    await expect(promise).rejects.toThrow(new RecordNotFoundError('Assignor'));
  });

  test('should return a new assignor', async () => {
    const response = await sut.execute(dto);

    expect(response).toEqual(assignorRepositoryStub.response);
  });
});
