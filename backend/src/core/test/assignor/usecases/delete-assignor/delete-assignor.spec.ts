import { NotFoundException } from '@nestjs/common';
import { AssignorRepository } from '@core/assignor/ports/repository';
import {
  DeleteAssignorInput,
  DeleteAssignorUseCase,
} from '@core/assignor/usecases/delete-assignor';
import { Assignor } from '@core/assignor/model';
import { Test, TestingModule } from '@nestjs/testing';
import { AssignorDataBuilder } from '@core/test/__mocks__/data-builder';

describe('DeleteAssignorUseCase', () => {
  let sut: DeleteAssignorUseCase;
  let assignorRepository: AssignorRepository;

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
      providers: [DeleteAssignorUseCase, AssignorRepositoryProvider],
    }).compile();

    sut = app.get<DeleteAssignorUseCase>(DeleteAssignorUseCase);
    assignorRepository = app.get<AssignorRepository>(AssignorRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(assignorRepository).toBeDefined();
  });

  describe('execute', () => {
    it('should call assignorRepository find by id with correct values', async () => {
      const input: DeleteAssignorInput = {
        id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      };

      await sut.execute(input);

      expect(assignorRepository.findById).toHaveBeenCalledTimes(1);
      expect(assignorRepository.findById).toHaveBeenCalledWith(input.id);
    });

    it('should return an exception if assignor not found', async () => {
      jest.spyOn(assignorRepository, 'findById').mockResolvedValueOnce(null);
      const input: DeleteAssignorInput = { id: 'non-existing-id' };

      await expect(sut.execute(input)).rejects.toThrow(NotFoundException);
    });

    it('should call the repository delete method if assignor exists', async () => {
      const input: DeleteAssignorInput = {
        id: '65b1c7d4-0f3a-4386-b0ef-32202f36b26b',
      };

      await sut.execute(input);

      expect(assignorRepository.delete).toHaveBeenCalledTimes(1);
      expect(assignorRepository.delete).toHaveBeenCalledWith(input.id);
    });
  });
});
