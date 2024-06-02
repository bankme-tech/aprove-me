import { NotFoundException } from '@nestjs/common';
import { Assignor } from '@core/assignor/model';
import { GetAssignorUseCase } from '@core/assignor/usecases';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { AssignorDataBuilder } from '@core/test/__mocks__/data-builder';
import { Test, TestingModule } from '@nestjs/testing';

describe('GetAssignorUseCase', () => {
  let sut: GetAssignorUseCase;
  let assignorRepository: AssignorRepository;

  const id = '65b1c7d4-0f3a-4386-b0ef-32202f36b26b';
  const input = AssignorDataBuilder.anAssignor().build();
  const assignor = Assignor.create(input);

  beforeEach(async () => {
    jest.clearAllMocks();

    const AssignorRepositoryProvider = {
      provide: AssignorRepository,
      useValue: {
        findById: jest.fn().mockResolvedValue(assignor),
        delete: jest.fn().mockResolvedValue(0),
      },
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [GetAssignorUseCase, AssignorRepositoryProvider],
    }).compile();

    sut = app.get<GetAssignorUseCase>(GetAssignorUseCase);
    assignorRepository = app.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(assignorRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should throw NotFoundException if assignor does not exist', async () => {
      jest.spyOn(assignorRepository, 'findById').mockResolvedValueOnce(null);

      await expect(sut.execute(id)).rejects.toThrow(NotFoundException);
    });

    it('should return the assignor if it exists', async () => {
      const result = await sut.execute(id);

      expect(result).toStrictEqual(assignor);
    });
  });
});
