import { Test, TestingModule } from '@nestjs/testing';
import { FindAssignorInputDTO } from 'src/assignor/dto/find-assignor.input.dto';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { FindAssignorUseCase } from 'src/assignor/usecases/find-assignor.usecase';
import { makeAssignorEntity } from '../../mocks/entities/assignor.entity.mock';
import { AssignorRepositoryStub } from '../../mocks/repositories/assignor.repository.mock';

describe('FindAssignorUseCase', () => {
  let sut: FindAssignorUseCase;
  let assignorRepositoryStub: AssignorRepositoryStub;
  let dto: FindAssignorInputDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAssignorUseCase,
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<FindAssignorUseCase>(FindAssignorUseCase);
    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);

    const { id } = makeAssignorEntity();
    dto = {
      id,
    };
  });

  test('should call assignorRepository with correct value', async () => {
    const findAllSpy = jest.spyOn(assignorRepositoryStub, 'findById');

    await sut.execute(dto);

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  test('should return an assignor', async () => {
    const response = await sut.execute(dto);

    expect(response).toEqual(assignorRepositoryStub.response);
  });
});
