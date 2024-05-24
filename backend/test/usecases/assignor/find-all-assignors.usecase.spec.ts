import { Test, TestingModule } from '@nestjs/testing';
import { AssignorRepositoryStub } from '../../mocks/repositories/assignor.repository.mock';
import { IAssignorRepository } from 'src/assignor/repositories/assignor.repository.interface';
import { FindAllAssignorsUseCase } from 'src/assignor/usecases/find-all-assignors.usecase';

describe('FindAllAssignorsUseCase', () => {
  let sut: FindAllAssignorsUseCase;
  let assignorRepositoryStub: AssignorRepositoryStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllAssignorsUseCase,
        {
          provide: IAssignorRepository,
          useClass: AssignorRepositoryStub,
        },
      ],
    }).compile();

    sut = module.get<FindAllAssignorsUseCase>(FindAllAssignorsUseCase);
    assignorRepositoryStub =
      module.get<AssignorRepositoryStub>(IAssignorRepository);
  });

  test('should call assignorRepository', async () => {
    const findAllSpy = jest.spyOn(assignorRepositoryStub, 'findAll');

    await sut.execute();

    expect(findAllSpy).toHaveBeenCalledTimes(1);
  });

  test('should return a list of assignors', async () => {
    const response = await sut.execute();

    expect(response).toEqual([assignorRepositoryStub.response]);
  });
});
