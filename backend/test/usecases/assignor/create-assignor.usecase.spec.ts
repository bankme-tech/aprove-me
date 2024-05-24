import { Test, TestingModule } from '@nestjs/testing';
import { CreateAssignorUseCase } from 'src/assignor/usecases/create-assignor.usecase';
import { AssignorRepositoryStub } from '../../mocks/repositories/assignor.repository.mock';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { makeAssignorDTO } from '../../mocks/dtos.mock';

describe('CreateAssignorUseCase', () => {
  let sut: CreateAssignorUseCase;
  let assignorRepositoryStub: AssignorRepositoryStub;
  let dto: CreateAssignorInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAssignorUseCase,
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<CreateAssignorUseCase>(CreateAssignorUseCase);
    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);

    const { document, email, name, phone } = makeAssignorDTO();
    dto = {
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

  test('should return a new assignor', async () => {
    const response = await sut.execute(dto);

    expect(response).toEqual(assignorRepositoryStub.response);
  });
});
